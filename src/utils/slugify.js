import { slug as slugger } from "github-slugger";

export const slugifyStr = (str) => slugger(str);

const slugify = (post) => (post.postSlug ? slugger(post.postSlug) : slugger(post.title));

export const slugifyAll = (arr) => arr.map((str) => slugifyStr(str));

export default slugify;
