import { RedditIdentity } from "src/interfaces/reddit/identity.reddit";

export class Globals {
    public redditIdentity: RedditIdentity | null;
    public authorized: boolean = false;
}