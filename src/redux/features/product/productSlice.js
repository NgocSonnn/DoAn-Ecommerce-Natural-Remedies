import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productApis } from "../../../apis/productApis"

const initialState = {
    isLoading: false,
    products: [],
    productInfo: {},
    errors: {},
    pagination: {
        currentPage: 1,
        limitPerPage: 9,
        total: 0,

    },
    searchKey: "",
    sortField: "",
    sortOrder: "",
    brandId: null,
    typeId: null,
    bestSeller: '',
    sortedName: '',
    sortedPrice: '',
    params: {
        _sort: null,
        _order: null,
        price_gte: null,
        price_lte: null,
    },

}

export const actFetchAllProduct = createAsyncThunk("products/actFetchAllProduct", async (params = {}) => {
    const response = await productApis.getAllProduct({
        ...params,
    });
    return {
        data: response.data,
        total: response.headers.get('X-Total-Count')
    }
})

export const actFetchProductById = createAsyncThunk('products/actFetchProductById',
    async (productId) => {
        const response = await productApis.getProductsById(productId);
        return response
    }
)

export const actUpdateProductPurchases = createAsyncThunk(
    'products/updateProductPurchases',
    async (products) => {
        const updatePromises = products.map(item => {
            return productApis.updateProductPurchase(item.id, item.quantity);
        });
        const results = await Promise.all(updatePromises);
        return results;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setNewPage: (state, action) => {
            state.pagination.currentPage = action.payload
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload
        },

        setSortField: (state, action) => {
            state.sortField = action.payload
        },
        setSortNameProduct: (state, action) => {
            state.sortedName = action.payload;
            switch (action.payload) {
                case '1':
                    state.params._sort = "nameProduct";
                    state.params._order = "asc";
                    break;
                case '2':
                    state.params._sort = "nameProduct";
                    state.params._order = "desc";
                    break;
                case '3':
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case '4':
                    state.params._sort = "price";
                    state.params._order = "desc";
                    break;
                default:

                    break;
            }
        },
        setSortPriceProduct: (state, action) => {
            state.sortedPrice = action.payload;
            switch (action.payload) {
                case '0':
                    state.params.price_gte = 0;
                    state.params.price_lte = 500
                    state.params._sort = "id";
                    state.params._order = "asc";
                    break;
                case '1':
                    state.params.price_gte = 0;
                    state.params.price_lte = 99
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case '2':
                    state.params.price_gte = 100;
                    state.params.price_lte = 199
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case '3':
                    state.params.price_gte = 200;
                    state.params.price_lte = 299
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case '4':
                    state.params.price_gte = 300;
                    state.params.price_lte = 399
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case '5':
                    state.params.price_gte = 400;
                    state.params.price_lte = 499
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case '6':
                    state.params.price_gte = 499;
                    state.params.price_lte = 599
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                default:

                    break;
            }
        },

        setFilterProductBrandId: (state, action) => {
            state.brandId = action.payload
        },

        setFilterProductTypeId: (state, action) => {
            state.typeId = action.payload
        },
        setBestSellProduct: (state, action) => {
            state.bestSeller = action.payload
            state.params._sort = 'purchase'
            state.params._order = 'desc'
        },
        setSearchParams: (state, action) => {
            const { params } = action.payload;
            state.params = { ...state.params, ...params };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actFetchAllProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(actFetchAllProduct.rejected, (state, action) => {
            state.errors = {}
            state.isLoading = false
        })
        builder.addCase(actFetchAllProduct.fulfilled, (state, action) => {
            state.products = action.payload.data
            state.isLoading = false;
            state.pagination.total = action.payload.total
        })
        builder.addCase(actFetchProductById.fulfilled, (state, action) => {
            state.productInfo = action.payload
        })
        builder.addCase(actUpdateProductPurchases.fulfilled, (state, action) => {
            state.isLoading = false;
            action.payload.forEach(updatedProduct => {
                const index = state.products.findIndex(product => product.id === updatedProduct.id);
                if (index !== -1) {
                    state.products[index].purchase += updatedProduct.quantity;
                }
            });
        })
    }
})
export const { setLoading, setNewPage, setSearchKey, setSortField, setSortNameProduct, setBestSellProduct, setSortPriceProduct, setSearchParams, setFilterProductBrandId, setFilterProductTypeId } = productSlice.actions
export const productReducer = productSlice.reducer