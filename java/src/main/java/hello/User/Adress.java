package hello.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Adress {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    String adress;

    public Integer getId() {
        return id;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getAdress() {
        return adress;
    }
}
