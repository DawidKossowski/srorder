package hello;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;


@Entity
public class Order_Product {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private Integer orderId;

    private Integer productId;

    /*@ManyToOne
    @JoinColumn(name="id", table= hello.Product)
    private Product product;*/

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {

    this.productId = productId;
    }

   /* public Product getProduct() {
        return product;
    }

    public void setProduct(hello.Product product) {
        this.product=product;
    }*/
}
