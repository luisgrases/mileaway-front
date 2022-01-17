declare module "Types" {
  type FriendRequest = {
    id: number;
    from: User;
    to: User;
  };
}
