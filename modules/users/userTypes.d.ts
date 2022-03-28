declare module "Types" {
  type User = {
    id: number;
    username: string;
    isSharingLocation: boolean;
    locationUpdatedAt: string;
    requestsReceived: FriendRequest[]
    requestsSent: FriendRequest[]
  };
}
