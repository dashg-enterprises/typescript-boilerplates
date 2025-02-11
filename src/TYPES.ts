export const TYPES = {
    AccountDataRepo: Symbol.for("Repository<Account>"),
    IAccountRepo: Symbol.for("IAccountRepo"),
    IAccountService: Symbol.for("IAccountService"),
    WishlistDataRepo: Symbol.for("Repository<Wishlist>"),
    IWishlistRepo: Symbol.for("IWishlistRepo"),
    IWishlistService: Symbol.for("IWishlistService"),
    Axios: Symbol.for("Axios"),
    IRestClient: Symbol.for("IRestClient"),
    IWeatherClient: Symbol.for("IRestClient"),
    IConfigProvider: Symbol.for("IConfigProvider"),
    IExampleService: Symbol.for("IExampleService"),
    IExampleController: Symbol.for("IExampleController"),
    IExampleDao: Symbol.for("IExampleDao"),
    ExampleDataRepository: Symbol.for("ExampleDataRepository")
}