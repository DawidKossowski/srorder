package hello;

import org.springframework.data.repository.CrudRepository;

public interface Order_ProductRepository extends CrudRepository<hello.Order_Product, Long> {
}
