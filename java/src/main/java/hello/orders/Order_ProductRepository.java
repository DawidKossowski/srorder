package hello.orders;

import org.springframework.data.repository.CrudRepository;

public interface Order_ProductRepository extends CrudRepository<Order_Product, Long> {
}
