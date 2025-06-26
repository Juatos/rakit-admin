import type { SetupHttpOptions } from "$rk"
import type { Alova, AlovaGenerics } from "alova"
import { createAlova } from "alova"
import { useRequest } from "alova/client"
import adapterFetch from "alova/fetch"
import VueHook from "alova/vue"

class Manager {
  private http: Alova<AlovaGenerics> = null as any

  private formatHeaders: any = null

  public init(options: SetupHttpOptions) {
    this.http = createAlova({
      baseURL: options?.baseURL,
      statesHook: VueHook,
      requestAdapter: adapterFetch(),
      timeout: options?.timeout || 100000,
      // @todo: 未知原因，这个会卡死项目
      // beforeRequest: (config) => {
      //   return config
      // },
      // 格式化结果
      responded: async (response) => {
        if (options?.formatResponse) {
          return options.formatResponse(response)
        }
        return await response.json()
      },
    })
    this.formatHeaders = options?.formatHeaders || null
  }

  public Get<T>(url: string, params?: Record<string, any>, config?: any) {
    if (this.http === null) {
      throw new Error("[HTTP] is not initialized!")
    }

    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url = url.includes("?") ? `${url}&${queryString}` : `${url}?${queryString}`
    }
    const headers = this.formatHeaders?.(config?.headers || {}) || {}
    delete config?.headers
    return this.http?.Get<T>(url, {
      headers,
      ...config,
    })
  }

  public Post<T>(url: string, params?: Record<string, any>, config?: any) {
    const headers = this.formatHeaders?.(config?.headers || {}) || {}
    delete config?.headers
    return this.http?.Post<T>(url, params, {
      headers,
      ...config,
    })
  }

  public Upload<T>(url: string, formData: FormData, config?: any) {
    const headers = this.formatHeaders?.(config?.headers || {}) || {}
    // 文件上传时不设置Content-Type，让浏览器自动设置
    delete headers["Content-Type"]
    delete config?.headers
    return this.http?.Post<T>(url, formData, {
      headers,
      ...config,
    })
  }

  public defineEvent(func: any, options?: any) {
    const {
      loading: spin,
      data: result,
      send,
      onSuccess,
      onError,
      onComplete,
    } = useRequest(func, {
      immediate: options?.immediate === false,
      force: options?.force === true,
    })

    return {
      spin,
      result,
      send,
      onSuccess,
      onError,
      onComplete,
    }
  }
}

export const manager = new Manager()
