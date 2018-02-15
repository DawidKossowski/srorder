package hello.orders;

import hello.Customer.Customer;

import javax.persistence.*;

import java.util.Date;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private Date date;

   /* @OneToOne
    @JoinColumn(name="customerId")
    private Customer customer;*/

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

   /* public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }*/
}
