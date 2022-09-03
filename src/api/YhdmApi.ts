import request from '@/utils/request';

// 获取搜索结果
export const getYhdmAnimeSearchInfo = (keywords: string) => {
  return request({
    method: 'get',
    url: '/api/getSearchInfo',
    params: { keywords: keywords }
  });
};
// 获取yhdm 播放页信息
export const getYhdmAnimeVideoInfo = (url: string) => {
  return request({
    method: 'get',
    url: '/api/getVideoUrl',
    params: { url: url }
  });
};
