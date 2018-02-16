package hello.User;

import javax.persistence.*;

@Entity
public class User_Adress {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @OneToOne
    @JoinColumn(name="userId")
    private User user;

    @OneToOne
    @JoinColumn(name="AdressId")
    private Adress adress;

    public Integer getId() {
        return id;
    }

    public void setAdress(Adress adress) {
        this.adress = adress;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Adress getAdress() {
        return adress;
    }
}
