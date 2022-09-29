import SponsorACM from "@/assets/sponsor_acm.png";
import { mdiQqchat, mdiEmail, mdiGithub } from "@mdi/js";

export default () => {

    const statics = {
        icons: {
            mdiQqchat,
            mdiEmail,
            mdiGithub,
        }
    };

    const sponsors = [
        {
            name: "上海科技大学ACM社", 
            home: "https://acm.shanghaitech.edu.cn/", 
            logo: SponsorACM, // TODO: Move this to cdn
        }, 
    ]

    const contributors = [
        {
            name: "logan", 
            home: "github:LoganJoe", 
            avatar: "github:36989741" 
        }, 
        {
            name: "teafrogsf",
            home: "qq:861940148", 
            avatar: "qq:861940148",
        },         
        {
            name: "WAAutoMaton",
            home: "github:WAAutoMaton", 
            avatar: "github:24771667"
        }, 
        {
            name: "yanglinshu",
            home: "github:yanglinshu", 
            avatar: "github:46046648"
        }, 
        {
           name: "Clarivy", 
           home: "github:Clarivy",
           avatar: "github:62002698"
        }, 
        {
            name: "wenxuanjun", 
            home: "github:wenxuanjun",
            avatar: "github:41050170",
        }, 
        {
            name: "陆沈欢", 
            home: "qq:2366384567", 
            avatar: "qq:2366384567",  
        }, 
        {
            name: "邓宸希", 
            home: "qq:3260984912",
            avatar: "qq:3260984912",
        }, 
        {
            name: "失踪猫猫", 
            home: "qq:2330905078", 
            avatar: "qq:2330905078",
        }, 
        {
            name: "猫剩子",
            home: "qq:2512031097",
            avatar: "qq:2512031097",
        },         
    ]


    return { statics, sponsors, contributors };
}