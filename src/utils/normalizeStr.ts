import { decode } from "html-entities";

const removeHTMLtag = (str: string) =>
  decode(str.replace(/<\/?[^>]+(>|$)/g, ""));

export default removeHTMLtag;