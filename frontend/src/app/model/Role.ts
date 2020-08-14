export class Role {
  id: number;
  roleName: string;

  static fromHttp(role: Role): Role {
    const newRole = new Role();
    newRole.id = role.id;
    newRole.roleName = role.roleName;
    return newRole;
  }
}
