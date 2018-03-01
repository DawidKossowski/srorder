package hello.products;


import hello.orders.OrdersController;
import jersey.repackaged.com.google.common.collect.Iterables;
import jersey.repackaged.com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.criteria.CriteriaBuilder;
import java.lang.reflect.Type;
import java.util.*;

@Controller
@RequestMapping(path="/api")
public class ProductSortController {

    @Autowired
    private ProductRepository p;

    @Autowired
    private ProductController productController;

    private static final Logger LOG = LoggerFactory.getLogger(OrdersController.class);


    @GetMapping(path = "/sortAlphabetically")
    public @ResponseBody Iterable<Product> getProductsAlphabetically() {

        ArrayList<Product> a = Lists.newArrayList(this.productController.getAllProducts());
        Collections.sort(a, Comparator.comparing(Product::getName));

        return (Iterable<Product>) a;

    }

    @GetMapping(path = "/sortByPrice")
    public @ResponseBody Iterable<Product> getProductsByPrice() {

        ArrayList<Product> a = Lists.newArrayList(this.productController.getAllProducts());
        Collections.sort(a, Comparator.comparing(Product::getPrice));

        return (Iterable<Product>) a;

    }
}
