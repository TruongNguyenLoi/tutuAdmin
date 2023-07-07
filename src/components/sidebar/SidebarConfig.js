
export const SidebarConfig = [
    {
        display_name: "Dashboard",
        route: "/admin/dashboard",
        icon: "bx bx-bar-chart",
    },
    // {
    //     display_name: "Dashboard 2",
    //     route: "/admin/dashboard2",
    //     icon: "bx bx-bar-chart",
    // },
    {
        display_name: "Sản phẩm",
        route: "/admin/products",
        icon: "bx bx-package",
        children: [
            {
                display_name: "Danh sách",
                route: "/admin/products/list",
                icon: "bx bx-add-to-queue",
            },
            {
                display_name: "Thêm Sản phẩm",
                route: "/admin/product/create",
                icon: "bx bx-add-to-queue",
            },
        ]
    },
    {
        display_name: "Giảm giá",
        route: "/admin/discount",
        icon: "bx bxs-comment",
    },
    {
        display_name: "Đơn đặt hàng",
        route: "/admin/orders",
        icon: "bx bx-cart",
    },
    {
        display_name: "Bình luận",
        route: "/admin/comments",
        icon: "bx bxs-comment",
    },
    {
        display_name: "Users",
        icon: "bx bx-user-pin",
        children: [
            {
                display_name: "Khách hàng",
                route: "/admin/customers",
                icon: "bx bx-user-pin",
            },
            {
                display_name: "NV Bán hàng",
                route: "/admin/sellers",
                icon: "bx bx-user-pin",
            },
        ]
    },
    {
        display_name: "Danh mục",
        icon: "bx bx-list-ol",
        children: [
            {
                display_name: "Danh mục",
                route: "/admin/categories",
                icon: "bx bx-list-ol",
            },
            {
                display_name: "Danh mục con",
                route: "/admin/subcategories",
                icon: "bx bx-list-ol",
            },
        ]
    },
    {
        display_name: "Kho hàng",
        route: "/admin/inventory",
        icon: "bx bx-store-alt",
        children: [
            {
                display_name: "Chăm sóc da",
                route: "/admin/inventory/SC",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Chăm sóc tóc",
                route: "/admin/inventory/HC",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Chăm sóc cơ thể",
                route: "/admin/inventory/BC",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Trang điểm",
                route: "/admin/inventory/MU",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Nước hoa",
                route: "/admin/inventory/PF",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Dụng cụ làm đẹp",
                route: "/admin/inventory/Bi",
                icon: "bx bx-store-alt",
            },
           
        ]
    },
    {
        display_name: "Thống kê",
        route: "/admin/analytics",
        icon: "bx bx-bar-chart-alt",
        children: [
            {
                display_name: "Kinh doanh",
                route: "/admin/report/business-performance",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Sản phẩm",
                route: "/admin/report/product",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Khách hàng",
                route: "/admin/report/customer",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Danh mục",
                route: "/admin/report/category",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Thương hiệu",
                route: "/admin/report/brand",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "Nhà cung cấp",
                route: "/admin/report/supplier",
                icon: "bx bx-store-alt",
            },
            {
                display_name: "NV Bán hàng",
                route: "/admin/report/seller",
                icon: "bx bx-store-alt",
            }
        ]
    },
    {
        display_name: "Khác",
        icon: "bx bx-fullscreen",
        children: [
            {
                display_name: "TT ví Momo",
                route: "/admin/momo-config",
                icon: "bx bx-package"
            },
            {
                display_name: "TT ví ZaloPay",
                route: "/admin/zalopay-config",
                icon: "bx bx-package"
            },
            {
                display_name: "TT Shop GHTK",
                route: "/admin/ghtk-config",
                icon: "bx bx-package"
            },
            {
                display_name: "TT Shop GHN",
                route: "/admin/ghn-config",
                icon: "bx bx-package"
            },
            {
                display_name: "Thương hiệu",
                route: "/admin/brands",
                icon: "bx bx-package"
            },
            {
                display_name: "Thanh toán",
                route: "/admin/payments",
                icon: "bx bx-bar-chart-alt"
            },
            {
                display_name: "Màu sắc",
                route: "/admin/colors",
                icon: "bx bx-bar-chart-alt"
            },
            {
                display_name: "Nhà cung cấp",
                route: "/admin/suppliers",
                icon: "bx bx-slideshow"
            },
            {
                display_name: "Slides",
                route: "/admin/slides",
                icon: "bx bx-slideshow"
            },
            {
                display_name: "Banner",
                route: "/admin/promotions",
                icon: "bx bx-slideshow"
            },
            {
                display_name: "Thông tin shop",
                route: "/admin/shop-info",
                icon: "bx bx-slideshow"
            },

        ]
    }
]

export const SIDEBAR_SHIPPER = [
    {
        display_name: "Dashboard",
        route: "/seller/dashboard",
        icon: "bx bx-bar-chart",
    },
    {
        display_name: "Đơn đặt hàng",
        route: "/seller/orders",
        icon: "bx bx-cart",
    },
    {
        display_name: "Thông tin",
        route: "/seller/info",
        icon: "bx bx-user-pin"
    },
    {
        display_name: "Đổi mật khẩu",
        route: "/admin/change-password",
        icon: "bx bxs-edit-alt"
    },
]