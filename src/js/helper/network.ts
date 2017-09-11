import {URL} from '../Constants';

export function goTo(href: string): void {
    window.location.href = href;
}

export function tweetGameResult(text: string): void {
    window.location.href = `${URL.TWITTER_TWEET_PAGE}?hashtags=やみどり+%23そこんところ工房&text=${text}&url=${URL.YAMIDORI}`;
}
