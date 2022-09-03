/**
 * We need to decide which to use as the short name to be displayed in
 * the avatar when there is no avatar.
 * @param {Object{
 *      nickname: String,
 *      realname: String,
 *      email: String,
 *      anonymous: Boolean
 * }} userProfile
 * 
 * @returns {String}
 */
export default (userProfile) => {
    const { nickname, realname, email, anonymous } = userProfile
    if (nickname) { // if we have a nickname, then use it
        return nickname
    } else if (realname && !anonymous) { // if we have a realname and not anonymous, then use it
        return realname
    } else { // otherwise, use the email
        return email
    }
}