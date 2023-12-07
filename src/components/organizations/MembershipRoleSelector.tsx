import { Trans } from 'next-i18next';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import type { MembershipRole } from '~/lib/organizations/types/membership-role';
import roles from '~/lib/organizations/roles';
import { IfHasPermissions } from '~/components/IfHasPermissions';
import { canInviteUser } from '~/lib/organizations/permissions';

const MembershipRoleSelector: React.FCC<{
  value?: MembershipRole;
  onChange?: (role: MembershipRole) => unknown;
}> = ({ value: currentRole, onChange }) => {
  const selectedRole = getSelectedRoleModel(currentRole);

  return (
    <Select
      value={selectedRole.value.toString()}
      onValueChange={(value) => {
        onChange && onChange(Number(value));
      }}
    >
      <SelectTrigger data-cy={'role-selector-trigger'}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {roles.map((role) => {
          return (
            <IfHasPermissions
              key={role.value}
              condition={(currentUserRole) =>
                canInviteUser(currentUserRole, role.value)
              }
            >
              <SelectItem
                data-cy={`role-item-${role.value}`}
                value={role.value.toString()}
              >
                <span className={'text-sm'}>
                  <Trans i18nKey={role.label} />
                </span>
              </SelectItem>
            </IfHasPermissions>
          );
        })}
      </SelectContent>
    </Select>
  );
};

function getSelectedRoleModel(currentRole: MembershipRole | undefined) {
  const memberRole = roles[2];

  return (
    roles.find((role) => {
      return role.value === currentRole;
    }) ?? memberRole
  );
}

export default MembershipRoleSelector;
