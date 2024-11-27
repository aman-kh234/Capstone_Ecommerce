package com.ecommerce.service.impl;
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.Exception.SellerException;
import com.ecommerce.config.JwtProvider;
import com.ecommerce.domain.AccountStatus;
import com.ecommerce.domain.UserRole;
import com.ecommerce.model.Address;
import com.ecommerce.model.Seller;
import com.ecommerce.repository.AddressRepository;
import com.ecommerce.repository.SellerRepository;
import com.ecommerce.service.SellerService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService{
	@Autowired
    private SellerRepository sellerRepository;
	@Autowired
    private JwtProvider jwtProvider;
	@Autowired
    private PasswordEncoder passwordEncoder;
	@Autowired
    private AddressRepository addressRepository;
   
    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
        // TODO Auto-generated method stub
       
        String email = jwtProvider.getEmailFromJwtToken(jwt);
       
        return this.getSellerByEmail(email);
    }
 
    @Override
    public Seller createSeller(Seller seller) throws Exception {
        Seller sellerExists = sellerRepository.findByEmail(seller.getEmail());
        if(sellerExists!=null) {
            throw new Exception("Seller already exist, used different email");
        }
       
        Address savedAddress = addressRepository.save(seller.getPickupAddress());
       
        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setRole(UserRole.Role_Seller);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBusinessDetails(seller.getBusinessDetails());
        newSeller.setBankDetails(seller.getBankDetails());
       
//      newSeller.setAccountStatus(seller.getAccountStatus());
       
        return sellerRepository.save(newSeller);
       
       
    }
 
    @Override
    public Seller getSellerById(Long id) throws SellerException {
        // TODO Auto-generated method stub
        return sellerRepository.findById(id).
                orElseThrow(()-> new SellerException("Seller not found with id - " + id));
    }
 
    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        // TODO Auto-generated method stub
        Seller seller = sellerRepository.findByEmail(email);
        if(seller == null) {
            throw new Exception("Seller not found");
        }
        return seller;
    }
 
    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        // TODO Auto-generated method stub
        return sellerRepository.findByAccountStatus(status);
    }
 
    @Override
    public Seller updateSeller(Long id, Seller seller) throws Exception {
        // TODO Auto-generated method stub
        Seller existingSeller = this.getSellerById(id);
       
        if(seller.getSellerName() != null) {
            existingSeller.setSellerName(seller.getSellerName());
        }
        if(seller.getMobile() != null) {
            existingSeller.setMobile(seller.getMobile());
        }
        if(seller.getEmail() != null) {
            existingSeller.setEmail(seller.getEmail());
        }
        if(seller.getBusinessDetails() != null
                && seller.getBusinessDetails().getBusinessName()!=null) {
            existingSeller.getBusinessDetails().setBusinessName(
                    seller.getBusinessDetails().getBusinessName()
            );
        }
       
        if(seller.getBankDetails()!=null && seller.getBankDetails().getAccountHolderName()!=null
                && seller.getBankDetails().getAccountNumber()!=null
                && seller.getBankDetails().getIfscCode()!=null) {
           
            existingSeller.getBankDetails().setAccountHolderName(
            seller.getBankDetails().getAccountHolderName());
           
            existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
            existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
        }
       
        if(seller.getPickupAddress() != null && seller.getPickupAddress().getAddress()!=null
                && seller.getPickupAddress().getCity()!=null
                && seller.getPickupAddress().getMobile() != null
                && seller.getPickupAddress().getState()!=null) {
           
            existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
            existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
            existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
        }
       
        if(seller.getGSTIN() != null) {
            existingSeller.setGSTIN(seller.getGSTIN());
        }
       
        return sellerRepository.save(existingSeller);
    }
 
    @Override
    public void deleteSeller(Long id) throws Exception {
        // TODO Auto-generated method stub
       
        Seller seller =  this.getSellerById(id);
        sellerRepository.delete(seller);
       
    }
 
    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        // TODO Auto-generated method stub
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerfied(true);
       
        return sellerRepository.save(seller);
    }
 
    @Override
    public Seller updateSellerAccountStatus(Long id, AccountStatus status) throws Exception {
        // TODO Auto-generated method stub
        Seller seller = getSellerById(id);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
 
}