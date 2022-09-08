const defaultStatus = {
    selected: [],
    sortKey: '发布时间',
    order: '从后往前',
}

const sortStatics = {
    sortKeyItem: ['发布时间', '修改时间'],
    orderItem: {
        "发布时间": ['从后往前', '从前往后'],
        "修改时间": ['从后往前', '从前往后']
    },
}


const sortPolicy = {
    "发布时间": (x) => new Date(x.post_time),
    "修改时间": (x) => new Date(x.update_time)
}

export { defaultStatus, sortStatics, sortPolicy}
