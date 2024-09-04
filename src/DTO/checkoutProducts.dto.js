class CheckoutProductsDTO {

    constructor (data) {
        this.price_data = {
            product_data : { name : data.product_id.title },
            currency: 'usd',
            unit_amount: Math.round(data.product_id.price * 100)
        }
        this.quantity = data.product_quantity        
    }
}

export default CheckoutProductsDTO