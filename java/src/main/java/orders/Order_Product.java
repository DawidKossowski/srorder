package hello;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;

@Entity
public class Order_Product {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @OneToOne
    @JoinColumn(name="orderId")
    private Orders order;

    @OneToOne
    @JoinColumn(name="productId")
    private Product product;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(hello.Product product) {
        this.product = product;
    }

    public hello.Orders getOrder() {
        return order;
    }

    public void setOrder(hello.Orders order) {
        this.order = order;
    }
}
