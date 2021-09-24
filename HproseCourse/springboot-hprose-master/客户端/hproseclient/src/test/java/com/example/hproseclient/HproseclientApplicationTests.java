package com.example.hproseclient;

import com.example.hproseclient.service.IService;
import hprose.client.HproseHttpClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HproseclientApplicationTests {

	@Test
	public void contextLoads() {
//		System.out.println("Hello World!");
		HproseHttpClient client = new HproseHttpClient();
		client.useService("http://localhost:8080/hprose/service");
//		System.out.println(client.toString());

		//通过接口调用
//		IService service = client.useService(IService.class);
//		String content = service.sayHello("Jack");
//		System.out.println("rpc调用，返回：" + content);

		try {
            //通过invoke调用
            String content = client.invoke("sayHello", new Object[]{"Jack"}, String.class);
            System.out.println("rpc调用，返回：" + content);
        } catch (Throwable e) {
            e.printStackTrace();
        }
	}

}
