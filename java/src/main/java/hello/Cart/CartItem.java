package hello.Cart;

import hello.User.User;
import hello.products.Product;

import javax.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Integer id;

    @OneToOne
    @JoinColumn(name="productId")
    public Product product;

    public Integer amount;

    @OneToOne
    @JoinColumn(name="cartId")
    public UserCart cart;

}
