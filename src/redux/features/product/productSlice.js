import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productApis } from "../../../apis/productApis"

const initialState = {
    isLoading: false,
    products: [],
    filterProduct: [],
    productInfo: {},
    errors: {},
    pagination: {
        currentPage: 1,
        limitPerPage: 9,
        total: 8,

    },
    searchKey: "",
    sortField: "",
    sortOrder: "",
    filters: {
        brandId: null,
        typeId: null,
        price: null,
        purchase: null
    },
    sorted: '',
    params: {
        _sort: null,
        _order: null,
        price_gte: null,
        price_lte: null,
        brandId_like: null,
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
        const product = await productApis.getProductsById(productId);
        return product
    }
)

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
        setSortProduct: (state, action) => {
            state.sorted = action.payload;

            switch (action.payload) {
                case "Tên: A -> Z":
                    state.params._sort = "nameProduct";
                    state.params._order = "asc";
                    break;
                case "Tên: Z -> A":
                    state.params._sort = "nameProduct";
                    state.params._order = "desc";
                    break;
                case "Giá: Thấp -> Cao":
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "Giá: Cao -> Thấp":
                    state.params._sort = "price";
                    state.params._order = "desc";
                    break;
                case "0K -> 99K":
                    state.params.price_gte = 0;
                    state.params.price_lte = 99
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "100K -> 199K":
                    state.params.price_gte = 100;
                    state.params.price_lte = 199
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "200K -> 299K":
                    state.params.price_gte = 200;
                    state.params.price_lte = 299
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "300K -> 399K":
                    state.params.price_gte = 300;
                    state.params.price_lte = 399
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "400K -> 499K":
                    state.params.price_gte = 400;
                    state.params.price_lte = 499
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                default:
                    state.params.price_gte = 0;
                    state.params.price_lte = 500
                    state.params._sort = "id";
                    state.params._order = "asc";
                    break;
            }
        },

        setFilterProduct: (state, action) => {
            state.filters = action.payload
            if (state.filters.brandId === 0) {
                state.filters = state.filters.typeId === 1 && state.filters.typeId === 2;
            } else {
                state.filters = action.payload
            }
        },
        setBestSellProduct: (state, action) => {
            state.filters = action.payload
            state.params._sort = 'purchase'
            state.params._order = 'desc'
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

    }
})
export const { setLoading, setNewPage, setSearchKey, setSortField, setSortProduct, setFilterProduct, setBestSellProduct } = productSlice.actions
export const productReducer = productSlice.reducer