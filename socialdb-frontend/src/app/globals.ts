import { RedditIdentity } from "src/interfaces/reddit/identity.reddit";
import { Constants } from "./constants";

export class Globals {
    public redditIdentity: RedditIdentity | null;
    public authorized: boolean = false;
    public userLanguage: string = Constants.LANGUAGE_ENGLISH;
}