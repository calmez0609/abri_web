export default {
    methods: {
        addToCart(id, qty = 1) {
            const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
            const cart = {
              product_id: id,
              qty,
            };
            this.isLoading = true;
            this.$http.post(url, { data: cart }).then((response) => {
              this.isLoading = false;
              this.$httpMessageState(response, '加入購物車');
              this.$router.push('/user/cart');
            });
          },
    }
}