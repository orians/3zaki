import { IStoreModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function addLocales({ container }: { container: any }) {
  const storeService: IStoreModuleService = container.resolve(Modules.STORE)

  const [store] = await storeService.listStores()
  await storeService.updateStores(store.id, {
    supported_locales: [
      { locale_code: "en-US" },
    ],
  })
  console.log("✔ Store supported locales set to: en-US")
}
