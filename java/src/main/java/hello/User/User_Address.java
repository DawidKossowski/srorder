package hello.User;

import javax.persistence.*;

@Entity
public class User_Address {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @OneToOne
    @JoinColumn(name="userId")
    private User user;

    @OneToOne
    @JoinColumn(name="AddressId")
    private Address address;

    public Integer getId() {
        return id;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Address getAddress() {
        return address;
    }
}
