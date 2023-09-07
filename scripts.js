/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"lzhu1jkbHGXvFnmY","label":"social.media","bookmarks":[{"id":"xygB1wwahUXJKKk4","label":"reddit","url":"https://www.reddit.com/"},{"id":"tApelWB8Z7VCja1J","label":"twitter","url":"https://twitter.com/Nevaleeen/likes?lang=en"},{"id":"q2ckyYrUKem7oC0H","label":"wallhaven","url":"https://wallhaven.cc/"}]},{"id":"HsgAQX3uDk7ZNU20","label":"gaming","bookmarks":[{"id":"bycOJ0mSMIJ3y6bm","label":"resetera","url":"https://www.resetera.com/"},{"id":"OoDgBwEJjYgao2NC","label":"allgemein","url":"https://forum.square-enix.com/ffxiv/forums/778"},{"id":"u6TCZcv7NjOaGrhm","label":"eorzea","url":"https://ffxiv.eorzeacollection.com/glamours"},{"id":"l5bIfdTxhxhuTA58","label":"gg.deals","url":"https://gg.deals/"}]},{"id":"WC27QqCWnrdv1gLY","label":"media","bookmarks":[{"id":"r1TjRCWOV8D50CeG","label":"youtube","url":"https://www.youtube.com/"},{"id":"sRhEefFtVlv6sOoA","label":"twitch","url":"https://www.twitch.tv/"},{"id":"AxIZEEy4KBVntNVM","label":"aniwave","url":"https://aniwave.to/home"}]},{"id":"koHqxyGwd9o8MNUi","label":"sources","bookmarks":[{"id":"XX0eYhEkujv2c3Ya","label":"icons","url":"https://feathericons.com/"},{"id":"PuIbgF2RhQRpvKxA","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"24XU3q7iwYw97cln","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"hSSpHs1pFfwbQbE6","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
