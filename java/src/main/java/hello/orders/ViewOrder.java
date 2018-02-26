package hello.orders;

        import java.util.*;
        import java.util.Date;

        import hello.User.Address;
        import hello.products.Product;

        import javax.persistence.criteria.CriteriaBuilder;

public class ViewOrder {

    public Integer id;
    public String date;

    public List<Product> products;

    public Address address;
}
