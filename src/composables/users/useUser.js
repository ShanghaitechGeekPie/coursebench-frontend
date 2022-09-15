import { onMounted, provide, reactive, ref, inject, watch } from "vue"
import { instituteInfo, gradeItems } from "@/composables/global/useStaticData"
import useDebounce from "@/composables/global/useDebounce"
import useWatching from "@/composables/global/useWatching"
import useRefCopy from "@/composables/global/useRefCopy"
import useRecordWatch from "@/composables/global/useRecordWatch"
import useFetching from "@/composables/global/useFetching"
import useUserName from "@/composables/global/useUserName"
import { sortCmp } from "@/composables/global/useArrayUtils"
import { defaultStatus, sortPolicy } from "@/composables/global/useCommentSort"
import { useRouter, useRoute } from "@/router/migrateRouter"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"


export default () => {

  const router = useRouter()
  const route = useRoute()
  const showSnackbar = inject("showSnackbar")
  const global = inject('global')



  const userProfile = reactive({
    email: "", 
    year: 0, 
    grade: "", 
    nickname: "", 
    realname: "", 
    avatar: "", 
    is_anonymous: true, 
  })

  const commentText = ref([])

  const commentStatistic = reactive({
    total: 0,
    score: 0,
    count: (() => {
      let ret = {}
      Object.keys(instituteInfo).filter(key => key !== '').forEach(key => {
        ret[key] = 0
      })
      return ret
    })(), 
  })


  
  const status = reactive({
    profileLoading: true,
    commentLoading: true,
  })
  const commentFilterStatus = reactive(defaultStatus)



  const getUserProfile = () => {
    const id = route.params.id
    const { status: fetchStatus, data, error } = useFetching(["user_profile", id], "/user/profile/" + id)
    useWatching(fetchStatus, () => {
      if (fetchStatus.value == "success") {
        status.profileLoading = false
      } else if (fetchStatus.value == "error") {
        if (isNetworkError(error.value.response)) {
          showSnackbar("网络连接错误", 3000)
        } else if (isValidErrorMessage(error.value.response.data.msg)) {
          showSnackbar("error", error.value.response.data.msg, 3000)
        } else {
          showSnackbar("error", "服务器发生错误", 3000)
        }
        setTimeout(() => router.push("/"), 3000)
      }
    })
    useWatching(data, () => {
      if (data.value) {
        if (id == global.userProfile.id) {
          // if we see our own profile, we should not be anonymous          
          useRefCopy(global.userProfile, userProfile)
        } else {
          useRefCopy(data.value.data, userProfile)          
        }
        userProfile.nickname = useUserName(userProfile)
        userProfile.grade = gradeItems[userProfile.grade]
        userProfile.year = userProfile.year == 0 ? "暂不透露" : userProfile.year
      }
    })
  }

  const getCommentText = () => {
    const id = route.params.id
    const { status: fetchStatus, data, error } = useFetching(["comment_text", id], "/comment/user/" + id)
    useWatching(fetchStatus, () => {
      if (fetchStatus.value == "success") {
        status.commentLoading = false
      } else if (fetchStatus.value == "error") {
        if (isNetworkError(error.value.response)) {
          showSnackbar("网络连接错误", 3000)
        } else if (isValidErrorMessage(error.value.response.data.msg)) {
          showSnackbar("error", error.value.response.data.msg, 3000)
        } else {
          showSnackbar("error", "服务器发生错误", 3000)
        }
        setTimeout(() => router.push("/"), 3000)         
      }
    })
    useWatching(data, () => {
      if (data.value) {
        commentText.value = data.value.data ? [...data.value.data] : []
        getCommentStatistic()
        commentFilterStatus.selected = (() => {
          let ret = []
          for (let key in commentStatistic.count) {
            if (commentStatistic.count[key]) {
              ret.push(key)
            }
          } return ret
        })()
        commentText.value.sort(commentSortFunc)
      }
    })
  }

  const getCommentStatistic = () => {
    commentStatistic.total = commentText.value.length
    const schools = Object.getOwnPropertyNames(commentStatistic.count).filter((key) => {
      return key != "__ob__" && key != "其他学院"
    })
    for (let comment of commentText.value) {
      if (schools.indexOf(comment.course.institute) >= 0) {
        commentStatistic.count[comment.course.institute]++
      } else {
        commentStatistic.count["其他学院"]++
      }
    }
  }




  const commentSortFunc = (x, y) => {
    // by default, [0] is descending, [1] is ascending
    return (commentFilterStatus.order === sortStatics.orderItem[commentFilterStatus.sortKey][0] ? 1 : -1) *
      sortCmp(
        sortPolicy[commentFilterStatus.sortKey](x), sortPolicy[commentFilterStatus.sortKey](y)
      )
  }

  // Fixed: use an inefficient way to make work temporarily
  useRecordWatch(commentFilterStatus, useDebounce((lastStatus) => {
    if (lastStatus.order !== commentFilterStatus.order) {
      commentText.value.sort(commentSortFunc) // I dont know how js sort works in the vm
      // but dont feel strange if it dont work for the values that are the same
    } else if (lastStatus.sortKey !== commentFilterStatus.sortKey) {
      commentFilterStatus.order = sortStatics.orderItem[commentFilterStatus.sortKey][0] 
      commentText.value.sort(commentSortFunc) // I sort it here because some sort keys have the same order item
      // in that case the first if statement will not be triggered
    }
  }))



  provide("commentStatistic", commentStatistic)
  provide("commentFilterStatus", commentFilterStatus)
  provide("userProfile", userProfile)



  if (route.params.id == global.userProfile.id) {
    watch(() => global.userProfile, () => {
      useRefCopy(global.userProfile, userProfile)
      userProfile.nickname = useUserName(userProfile)
      userProfile.grade = gradeItems[userProfile.grade]
      userProfile.year = userProfile.year == 0 ? "暂不透露" : userProfile.year
    })
  }



  onMounted(() => {
    getUserProfile()
    getCommentText()    
  })


  return { commentText, commentFilterStatus, status }
  
}