const defaultStatus = {
  selected: [],
  sortKey: '赞同数',
  order: '从多到少',
};

const sortStatics = {
  sortKeyItem: ['发布时间', '修改时间', '赞同数'],
  orderItem: {
    发布时间: ['从后往前', '从前往后'],
    修改时间: ['从后往前', '从前往后'],
    赞同数: ['从多到少', '从少到多'],
  },
};

const sortPolicy = {
  发布时间: (x) => new Date(x.post_time),
  修改时间: (x) => new Date(x.update_time),
  赞同数: (x) => x.like - x.dislike,
};

export { defaultStatus, sortStatics, sortPolicy };
