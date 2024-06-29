const avatarRegistry = {
  qq: (id) => `https://q1.qlogo.cn/g?b=qq&nk=${id}&s=160`,
  github: (id) => `https://avatars.githubusercontent.com/u/${id}?s=64&v=4`,
};

/**
 * Map avatar notation to avatar url, using the avatar registry above.
 *
 * @param {String} link - Avatar notation.
 * @returns String - Avatar url.
 *
 * @remarks
 *  Since it uses vuetify to match mobile devices, it only works in vue components.
 */
export function parseAvatarLink(link) {
  if (link === '') {
    return '';
  }
  for (const [key, value] of Object.entries(avatarRegistry)) {
    if (link.startsWith(key)) {
      if (value instanceof Function) {
        return value(link.slice(key.length + 1));
      } else if (this.$vuetify.breakpoint.xsOnly) {
        return value.mobile(link.slice(key.length + 1));
      } else {
        return value.desktop(link.slice(key.length + 1));
      }
    }
  }
  return link;
}

const homeRegistry = {
  qq: {
    mobile: (id) =>
      `mqqwpa://im/chat?chat_type=wpa&uin=${id}&version=1&src_type=web`,
    desktop: (id) => `tencent://message/?uin=${id}&Site=qq&Menu=yes`,
  },
  github: (id) => `https://github.com/${id}`,
  email: (id) => `mailto:${id}`,
  homepage: (id) => id,
};

/**
 * Map home notation to home url, using the home registry above.
 *
 * @param {String} link - Home notation.
 * @returns String - Home url.
 *
 * @remarks
 *  Since it uses vuetify to match mobile devices, it only works in vue components.
 */
export function parseHomeLink(link) {
  if (link === '') {
    return 'javascript:void(0)';
  }
  for (const [key, value] of Object.entries(homeRegistry)) {
    if (link.startsWith(key)) {
      if (value instanceof Function) {
        return value(link.slice(key.length + 1));
      } else if (this.$vuetify.breakpoint.xsOnly) {
        return value.mobile(link.slice(key.length + 1));
      } else {
        return value.desktop(link.slice(key.length + 1));
      }
    }
  }
  return link;
}
