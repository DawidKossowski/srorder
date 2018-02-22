package hello.Cart;

import hello.User.UserController;
import hello.orders.OrdersController;
import hello.products.ProductController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path="/api")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserController userController;

    @Autowired
    private ProductController productController;

    private static final Logger LOG = LoggerFactory.getLogger(OrdersController.class);

    @GetMapping(path = "/createCart")
    public @ResponseBody
    UserCart createCart(@RequestParam Integer userId) {
        UserCart userCart = new UserCart();
        userCart.user = this.userController.getUserById(userId);
        this.cartRepository.save(userCart);
        return userCart;
    }

    @GetMapping(path = "/getCart")
    public @ResponseBody
    UserCart getCartByUserId(@RequestParam Integer userId) {

        for (UserCart usercart : this.cartRepository.findAll()
                ) {
            if (usercart.user.getId() == userId) {
                return usercart;
            }
        }
        return null;
    }

    @GetMapping(path = "/saveCartItem")
    public @ResponseBody String saveCart(@RequestParam Integer productId,
                                         @RequestParam Integer userId,
                                         @RequestParam Integer amount) {
        LOG.info("weszlo");
        if(getCartByUserId(userId)==null) {
            UserCart userCart = new UserCart();
            userCart.user = this.userController.getUserById(userId);
            this.cartRepository.save(userCart);
            LOG.info("new cart created");
        }

        for (CartItem cartitem : getItemsInCartByCartId( this.getCartByUserId(userId).id)) {
            if (cartitem.product.getId() == productId) {
                cartitem.amount = amount;
                //alreadyInTheCart = true;
                this.cartItemRepository.save(cartitem);
                return "amount incremented";
            }
        }
        //  if (!alreadyInTheCart) {
        CartItem cartItem = new CartItem();
        cartItem.cart = getCartByUserId(userId);
        cartItem.product = this.productController.findProductById(productId);
        cartItem.amount = amount;
        this.cartItemRepository.save(cartItem);
        return "productAdded";
    }

    @RequestMapping(path ="/saveCartAtOnce")
    public @ResponseBody String save(@RequestBody WholeCartView cartToSave) {
        if(getCartByUserId(cartToSave.userId)==null) {
            UserCart userCart = new UserCart();
            userCart.user = this.userController.getUserById(cartToSave.userId);
            this.cartRepository.save(userCart);
            LOG.info("new cart created");
        }
        boolean isAlreadyInCart = false;

            for (Integer i = 0; i < cartToSave.amounts.size(); i++) {
                for (CartItem cartitem : getItemsInCartByCartId( this.getCartByUserId(cartToSave.userId).id)) {
                    if (cartitem.product.getId() == cartToSave.productsIds.get(i)) {
                        cartitem.amount = cartToSave.amounts.get(i);
                        this.cartItemRepository.save(cartitem);
                        isAlreadyInCart = true;
                        LOG.warn("product updated");
                    }
            }
                if(!isAlreadyInCart) {
                    CartItem cartItem = new CartItem();
                    cartItem.cart = getCartByUserId(cartToSave.userId);
                    cartItem.product = this.productController.findProductById(cartToSave.productsIds.get(i));
                    cartItem.amount = cartToSave.amounts.get(i);
                    this.cartItemRepository.save(cartItem);
                    LOG.warn("product addded");
                }
        }

        return "Cart saved";
    }


    @GetMapping(path = "/findItemInCart")
    public @ResponseBody
    List<CartItem> getItemsInCartByCartId(@RequestParam Integer cartId) {
        List<CartItem> result = new ArrayList<>();
        for (CartItem cartItem: cartItemRepository.findAll()
             ) {
            if(cartItem.cart.id == cartId) {
                result.add(cartItem);
            }
        }
        return result;
    }


}
