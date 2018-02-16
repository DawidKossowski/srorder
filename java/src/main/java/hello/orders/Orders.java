package hello.orders;

import hello.User.User;

import javax.persistence.*;

import java.util.Date;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private Date date;

    @OneToOne
    @JoinColumn(name="userId")
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User customer) {
        this.user = customer;
    }
}
