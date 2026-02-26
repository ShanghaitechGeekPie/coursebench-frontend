/**
 * We need to decide which to use as the short name to be displayed in
 * the avatar when there is no avatar.
 * @param {Object{
 *      nickname?: String,
 *      realname?: String,
 *      email: String,
 *      is_anonymous: Boolean
 *      id: String | Number
 * }} userProfile
 *
 * @returns {String}
 */
export default (userProfile) => {
  if (userProfile === null) {
    return '匿名用户';
  }
  const { nickname, realname, email, is_anonymous, id } = userProfile;
  if (nickname) {
    // if we have a nickname, then use it
    if (is_anonymous) {
      // if the user is anonymous, then use the nickname
      return '匿名用户（' + nickname + '）';
    }
    return nickname;
  } else if (realname && !is_anonymous) {
    // if we have a realname and not anonymous, then use it
    return realname;
  } else if (id) {
    // if we have user id, then use `User_${id}`
    return `User_${id}`;
  } else {
    // otherwise, use the email
    return email;
  }
};
