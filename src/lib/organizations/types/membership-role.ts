/**
 * @name MembershipRole
 * @description The roles of the application.
 * You can leverage these enum values to implement hierarchical access
 * control in your application.
 *
 * You can update this hierarchy as you see fit.
 *
 */
export enum MembershipRole {
  Member = 0,
  Admin = 1,
  Owner = 2,
}
