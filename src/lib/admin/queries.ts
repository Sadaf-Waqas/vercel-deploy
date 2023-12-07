import { getAuth, UserRecord } from 'firebase-admin/auth';

import {
  Query,
  DocumentSnapshot,
  CollectionReference,
} from 'firebase-admin/firestore';

import getRestFirestore from '~/core/firebase/admin/get-rest-firestore';

import {
  ORGANIZATIONS_COLLECTION,
  USERS_COLLECTION,
} from '~/lib/firestore-collections';

import { Organization } from '~/lib/organizations/types/organization';
import { MembershipRole } from '~/lib/organizations/types/membership-role';

export async function getUsers(params: {
  perPage: number;
  nextPageToken: Maybe<string>;
}) {
  const auth = getAuth();

  const { users, pageToken } = await auth.listUsers(
    params.perPage,
    params.nextPageToken || undefined,
  );

  return {
    users,
    pageToken,
  };
}

export async function getOrganizations(params: {
  beforeSnapshot: Maybe<string>;
  afterSnapshot: Maybe<string>;
  perPage: number;
}) {
  const organizationsCollection = getOrganizationsCollection();
  const { afterSnapshot, beforeSnapshot, perPage } = params;

  let snapshot: DocumentSnapshot | null = null;
  let query = organizationsCollection.orderBy('name', 'asc').limit(perPage);

  if (beforeSnapshot) {
    snapshot = await organizationsCollection.doc(beforeSnapshot).get();
    query = query.endBefore(snapshot).limitToLast(perPage);
  }

  if (afterSnapshot) {
    snapshot = await organizationsCollection.doc(afterSnapshot).get();
    query = query.startAfter(snapshot).limit(perPage);
  }

  const { docs } = await query.get();
  const count = await getQueryCount(organizationsCollection);

  const organizations = docs.map((doc) => {
    const data = doc.data();

    const members = Object.keys(data.members).map((id) => {
      const member = data.members[id];

      return {
        role: member.role,
        id,
      };
    });

    return {
      ...data,
      members,
      id: doc.id,
    };
  });

  return {
    organizations,
    count,
  };
}

export async function getOrganizationMembersByOrganizationId(
  organizationId: string,
) {
  type Result = {
    role: MembershipRole;
    id: string;
    email: string | undefined;
    emailVerified: boolean;
    displayName: string | undefined;
    photoURL: string | undefined;
    phoneNumber: string | undefined;
    disabled: boolean;
  };

  const auth = getAuth();
  const result = await getOrganizationsCollection().doc(organizationId).get();

  const organization = result.data();

  if (!result.exists || !organization) {
    throw new Error(`Organization not found`);
  }

  const userIds = Object.keys(organization.members);

  const requests = userIds.map((id) => {
    return new Promise<Result>(async (resolve, reject) => {
      const member = organization.members[id];
      const user = await auth.getUser(id).catch(() => null);

      if (!user) {
        console.warn(`User with ID ${id} not found in Firebase Auth`);

        return reject();
      }

      resolve({
        email: user.email ?? '',
        emailVerified: user.emailVerified,
        photoURL: user.photoURL ?? '',
        phoneNumber: user.phoneNumber ?? '',
        displayName: user.displayName ?? '',
        role: member.role,
        disabled: user.disabled,
        id,
      });
    });
  });

  return Promise.allSettled(requests).then((results) => {
    return results
      .filter(
        (result): result is PromiseFulfilledResult<Result> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);
  });
}

export async function getOrganizationsForUser(userId: string) {
  const result = await getOrganizationsCollection()
    .where(`members.${userId}`, '!=', null)
    .get();

  return result.docs.map((doc) => {
    return {
      ...doc.data(),
      members: [],
      id: doc.id,
      role: doc.data().members[userId].role,
    };
  });
}

function getOrganizationsCollection() {
  return getRestFirestore().collection(
    ORGANIZATIONS_COLLECTION,
  ) as CollectionReference<Organization>;
}

function getUsersCollection() {
  return getRestFirestore().collection(
    USERS_COLLECTION,
  ) as CollectionReference<UserRecord>;
}

function getQueryCount(query: Query) {
  return query
    .count()
    .get()
    .then((result) => {
      return result.data().count;
    });
}
