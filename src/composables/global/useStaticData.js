import { reactive } from "vue"

const instituteInfo = reactive({
    SIST: { name: "信息科学与技术学院", color: "#b0c4de" },
    SPST: { name: "物质科学与技术学院", color: "#00a650" },
    SLST: { name: "生命科学与技术学院", color: "#f39800" },
    SCA: { name: "创意与艺术学院", color: "#000000" },
    SEM: { name: "创业与管理学院", color: "#7d3c92" },
    GE: { name: "人文科学研究院", color: "#a40050" },
    BME: { name: "生物医学工程学院", color: "#101f5b" },
    IMS: { name: "数学科学研究所", color: "#2800ae" },
    Other: { name: "其他学院", color: "#757575" },
    None: { name: "", color: "#B0B0B0" }
})

const scoreInfo = reactive([
    { label: "特别差评", color: "#B71C1C" },
    { label: "差评如潮", color: "#FF5252" },
    { label: "多半差评", color: "#FF892F" },
    { label: "褒贬不一", color: "#FFC107" },
    { label: "多半好评", color: "#A4BE23" },
    { label: "好评如潮", color: "#709800" },
    { label: "特别好评", color: "#1B5E20" }
])

const gradeInfo = reactive({
    quality: ["很差", "较差", "一般", "较好", "很好"],
    workload: [">8h ", "4-8h", "2-4h", "1-2h", "<1h "],
    difficulty: ["很难", "较难", "适中", "偏易", "简单"],
    distribution: ["很差", "较差", "一般", "较好", "很好"],
    color: ["#FF5252", "#FF892F", "#FFC107", "#A4BE23", "#709800"], 
})

export { instituteInfo, scoreInfo, gradeInfo }