import axios from "axios";

export const apiCommon = {
    axio_conf: {
        baseURL: 'http://127.0.0.1:3000',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization,Origin, X-Requested-With, Content-Type, Accept"
        },
        timeout: 100000
    },
    getCurrentLocale() {
        let currentLocale = localStorage && localStorage.getItem("currentLanguage");

        if (!!currentLocale) {
            return currentLocale;
        }

        currentLocale = navigator && (navigator.language || navigator.browserLanguage);

        if (!!currentLocale && currentLocale.indexOf("zh") > -1) {
            return "zh-CN";
        }

        return "en-US";
    },
    validateStatus(reqMethod) {
        return function(status) {
            if (status === 401) {
                return false;
            } else if (status === 403) {
                //                message.warn("权限不足");
            }
            switch (reqMethod) {
                case "get":
                    return status === 200;
                case "delete":
                    return status === 204;
                case "put":
                    return status === 201;
                case "patch":
                case "post":
                    return status === 200 || status === 201;
                default:
                    return status >= 200 && status < 300;
            }
        };
    },
    /**
     * 请求后台, 只添加认证信息, 不进行任何处理的请求
     * @param url { string } 必须
     * @param method { string } [get] get, post, delete, put
     * @param data { object } [{}] 上传的数据, 在body体中
     * @param params { object } [{}] 请求的参数, 附在 url之后的
     * @param validateStatus { function } [this.validateStatus(method)]  如何安正返回 status
     * @returns { Promise }
     */
    requestData({
        method = "get",
        data = {},
        params = {},
        extraParams = {},
        url,
        validateStatus,
        stringifyData = true,
        config = apiCommon.axio_conf,
        errorCallback
    }) {
        const locale = (params && params.locale) || "en-US";
        if (!axios[method])
            throw new Error(
                locale === "en-US" ? `Function ${method} does not exist` : `不存在该方法:${method}`
            );
        if (!url) throw new Error(locale === "en-US" ? `invalid url domain` : "需要一个有效的url");
        if (!validateStatus) validateStatus = this.validateStatus(method);
        const instance = axios.create();
        instance.interceptors.response.use(
            function(response) {
                return response;
            },
            function(error) {
                if (errorCallback instanceof Function) {
                    if (error.response && error.response.data) {
                        if (error.response.data.errorMessage) {
                            errorCallback(error.response.data.errorMessage);
                        } else if (error.response.data.error_message) {
                            errorCallback(error.response.data.error_message);
                        }
                    } else {
                        errorCallback(
                            locale === "en-US"
                                ? "Unable to connect to the server. Please try again later."
                                : "无法连接服务器，请稍后再试"
                        );
                    }
                }
                // 如果后台不返回任何有意义的 error_message, 那么 catch 中 error不存在;
                return Promise.reject(error);
            }
        );
        return instance.request({
            url,
            method,
            params: {
                ...extraParams,
                ...params
            },
            data,
            validateStatus,
            ...config
        });
    },
    getDataByUrl(url, params, errorCallback) {
        return this.requestData({
            url,
            params,
            errorCallback
        });
    },
};
