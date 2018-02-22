package hello.Cart;

import hello.User.User;

import javax.persistence.*;

@Entity
public class UserCart {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Integer id;

    @OneToOne
    @JoinColumn(name="userId")
    public User user;
}
