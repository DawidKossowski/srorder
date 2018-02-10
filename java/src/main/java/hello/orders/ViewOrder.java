package hello.orders;

        import java.util.*;
        import java.util.Date;

        import hello.products.Product;

        import javax.persistence.criteria.CriteriaBuilder;

public class ViewOrder {

    public Integer id;
    public Date date;

    public List<Product> products;
}
