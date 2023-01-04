---
title: 10Java多线程
tags: Java
categories: Java基础
abbrlink: a4eed6f1
date: 2022-02-12 21:15:30
---

## 程序、进程、线程

- 程序（program）：程序是为了完成特定的任务，用某种语言编写的一组指令的集合，即之一段静态代码，静态对象
- 进程（process）：进程是程序的一次执行过程，或是正在运行的一段程序。是一个动态的过程。有它自身的产生，存在和消亡的过程 ------ 声明周期
  - 进程作为资源分配的单位，系统在运行时，会为每个进程分配不同的内存区域
- 线程（thread）：进程可以进一步细化为线程，是一个程序内部的一条执行路径
  - 线程作为调度和执行的单位，每个线程拥有独立的运行栈和程序计数器

## 单核CPU与多核CPU

- 单核CPU：是一种假的多线程，因为在一个时间单元内只能执行一个线程的任务
- 多核CPU：真正的多线程，一个时间单元内可以执行多个线程的任务，好比多车道，可以同时跑多辆汽车

## 并行和并发

- 并行：多个CPU同时执行多个任务。比如：多个人同时做不同的事情
- 并发：一个CPU同时执行多个任务。比如：秒杀活动，多个人同时执行一件事情

## 使用多线程的优点

背景：以单核CPU为例，只是用单个线程先后完成多个任务（调用多个方法），肯定要比使用多个线程来完成多个任务用时更短，那么为何还需要多线程呢？

多线程的优点：

- 提高应用程序的响应。对图形界面更有意义，增强用户体验
- 提高计算机系统CPU的利用率
- 改善程序结构。将即长又复杂的进程分为多个线程，独立运行，利于理解和修改

## 创建线程方式一：继承 Thread 类

获取当前线程的名称

```java
Thread.currentThread().getName()
```

不可以通过调用线程对象的 run 方法来新建线程，如果通过调用 run 方法，则还是在主线程中执行，并没有新建线程

如果想要再新建线程，必须重新创建一个线程对象，使用新的线程对象调用 start 方法。不能再调用已经 start 的线程去执行，这样做程序会抛出异常 `IllegalArgumentException`

```java
/**
 * 通过继承 Thread 类的方式创建一个线程
 * 1.创建一个继承与 Thread 的子类
 * 2.重写 Thread 类中的 run 方法，并将此线程的操作声明在 run 方法中
 * 3.创建 Thread 类子类的对象
 * 4.通过此对象调用 start 方法
 * <p>
 * 例子：遍历100以内的偶数
 *
 * @author songzhengxiang
 * @create 2021-07-22 14:49
 */

// 1.创建一个继承与 Thread 的子类
class MyThread extends Thread {
    // 2.重写 Thread 类中的 run 方法，并将此线程的操作声明在 run 方法中
    @Override
    public void run() {
        // Thread.currentThread().getName() 可以获取线程名称
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + ":" +  i);
            }
        }
    }
}

public class ThreadTest {
    public static void main(String[] args) {
        // 3.创建 Thread 类子类的对象
        MyThread t1 = new MyThread();
        // 4.通过此对象调用 start 方法.此时就会新创建一个线程来执行
        t1.start();
        // 问题一：不能通过 t1.run(); 的方式来新建一个线程
        // t1.run();

        // 问题2：如果需要再启动一个线程，必须重新新建一个线程对象去执行 start 方法，
        // 否则会报 IllegalArgumentException 异常
        // t1.start();
        MyThread t2 = new MyThread();
        t2.start();

        // 下面的代码仍然是在 main 线程中运行的，多个线程的打印结果是交叉的
        for (int i = 0; i < 100; i++) {
            if(i % 2 != 0){
                System.out.println(Thread.currentThread().getName() + ":" + i + "*****");
            }
        }
    }
}
```

## 继承 Thread 类的课后练习

Thread 练习：创建两个线程，一个线程打印100以内的所有偶数，一个线程打印100以内的所有奇数

```java
/**
 * Thread 练习：创建两个线程，一个线程打印100以内的所有偶数，一个线程打印100以内的所有奇数
 *
 * @author songzhengxiang
 * @create 2021-07-22 16:38
 */

// 创建第一个线程子类
class MyThread1 extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + ":" + i);
            }
        }
    }
}

// 创建第二个线程子类
class MyThread2 extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 != 0) {
                System.out.println(Thread.currentThread().getName() + ":" + i);
            }
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        MyThread1 m1 = new MyThread1();
        MyThread2 m2 = new MyThread2();
        m1.start(); // 执行第一个线程的任务
        m2.start(); // 执行第二个线程的任务
    }
}
```

## Thread 线程常用方法

1. `start(); `启动当前线程，调用当前线程中的 run() 方法
2. `run();` 要在 Thread 类的子类中重写此方法，将创建的线程要执行的操作写在这个方法中
3. `currentThread();` 静态方法，返回执行当前代码的线程
4. `getName();` 获取当前线程的名称
5. `setName();` 设置当前线程的名称
6. `yield();` 释放当前`cpu`的执行权，释放后cup仍然可能重新执行当前的线程
7. `join(); `等待其他线程运行完毕。在线程a中执行线程b的join方法，此时线程a进入阻塞状态，直到线程b执行结束，再接着执行线程a
8. `stop();` 已过时。强制结束此线程的方法
9. `sleep(long millis);` 线程睡眠，让当前正在执行的线程暂停执行，等待指定的毫秒数过后在继续执行。此方法接收的是毫秒
10. `isAlive();` 判断某个线程是否还活着，返回时一个布尔值

```java
/**
 * Thread 类中的常用方法
 * 1.start(); 启动当前线程，调用当前线程中的 run() 方法
 * 2.run(); 要在 Thread 类的子类中重写此方法，将创建的线程要执行的操作写在这个方法中
 * 3.currentThread(); 静态方法，返回执行当前代码的线程
 * 4.getName(); 获取当前线程的名称
 * 5.setName(); 设置当前线程的名称
 * 6.yield(); 释放当前cpu的执行权，释放后cup仍然可能重新执行当前的线程
 * 7.join(); 等待其他线程运行完毕。在线程a中执行线程b的join方法，此时线程a进入阻塞状态，直到线程b执行结束，再
 * 接着执行线程a
 * 8.stop(); 已过时。强制结束此线程的方法
 * 9.sleep(long millis); 线程睡眠，让当前正在执行的线程暂停执行，等待指定的毫秒数过后在继续执行。
 * 此方法接收的是毫秒
 * 10.isAlive(); 判断某个线程是否还活着，返回时一个布尔值
 *
 * @author songzhengxiang
 * @create 2021-07-23 9:46
 */
class Thread1 extends Thread {
    /**
     * 通过构造器的方式，在构造器中调用Thread的构造器设置线程名称 
     *
     * @param name
     */
    public Thread1(String name) {
        super(name);
    }

    @Override
    public void run() {
        // 在线程类内部通过使用 this.setName() 设置当前线程的名称，this 可以忽略直接使用 setName()
        // 也可以使用 Thread.currentThread().setName() 设置线程名称
        //this.setName("线程1");
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                // 线程等待10毫秒后再往下执行
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                // 可以使用 this.getName() 获取当前线程的名称,this 可以忽略，直接使用 getName() 获取名称
                // 也可以使用 Thread.currentThread().getName() 来获取线程名称
                System.out.println(getName() + ":" + i); //=> Thread-0:xx
            }
            // 当 i 可以被 20 整除时，释放当前cpu的执行权
//            if (i % 20 == 0) {
//                this.yield(); // 可以直接写成 yield(); 忽略 Thread
//            }
        }
    }
}

/**
 * 设置第二个线程
 */
class Thread2 extends Thread {
    Thread1 t;

    public Thread2(Thread1 t) {
        // 在线程2中获取到线程1的对象
        this.t = t;
        // 设置线程名称
        this.setName("线程2");
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            // 输出100以内的奇数
            if (i % 2 != 0) {
                System.out.println(this.getName() + ":" + i);
            }
            // 当线程2运行到21时，等待线程1运行完成在执行线程2
            if (i == 21) {
                try {
                    // join 方法等待其他线程运行完毕在执行线程1
                    // join 方法会抛出一个异常，所以要用 try catch 处理
                    t.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        // 使用 isAlive 判断某个线程是否还活着
        System.out.println(t.getName() + "是否还活着：" + t.isAlive());
    }
}

public class ThreadMethodsTest {
    public static void main(String[] args) {
        // 创建线程类对象
        Thread1 t1 = new Thread1("线程1"); // 通过构造器设置线程名称
        Thread2 t2 = new Thread2(t1); // 通过构造器将 t1 传给 t2 线程，方便测试 join 方法

        // 在线程类外边可以通过线程类对象调用 getName、setName 方法类获取和设置线程名称
        //t1.setName("线程1"); // 设置线程名称
        //System.out.println(t1.getName()); //=> 线程1

        // 使用 start 创建线程
        // t1线程和t2线程会并行执行
        t1.start();
        t2.start();

    }
}
```

## 线程的优先级设置

线程优先级的几个等级，Thread 类中定义了三个优先级常量

- `Thread.MIN_PRIORITY`，最小的优先级，数值是 1 
- `Thread.NORM_PRIORITY`，默认的优先级，数值是 5
- `Thread.MAX_PRIORITY`，最大的优先级，数值是 10
- 优先级可以在 1~10 之间内设置，设置其他等级时直接通过`Thread.setPriority()`

设置优先级的方法：`Thread.setPriority()`，获取优先级的方法：`Thread.getPriority()`

```java
/**
 * 线程的优先级设置
 * MIN_PRIORITY = 1; 最小的优先级
 * NORM_PRIORITY = 5; 默认的优先级
 * MAX_PRIORITY = 10; 最大的优先级
 * <p>
 * setPriority()； 设置线程的优先级,高优先级的会大概率先执行，并不是一定会先执行
 * getPriority()； 获取当前线程的优先级
 *
 * @author songzhengxiang
 * @create 2021-07-23 16:38
 */
class MyThread1 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                System.out.println(getName() + getPriority() + "：" + i);
            }
        }
    }
}

public class PriorityTest {
    public static void main(String[] args) {
        MyThread1 t = new MyThread1();
        t.setName("分线程");
        // 设置分线程的优先级为最高
        t.setPriority(Thread.MAX_PRIORITY);
        t.start();
        // 设置主线程的优先级为最小
        // 运行结果为高优先级的线程大概率会先执行完
        Thread.currentThread().setPriority(Thread.MIN_PRIORITY);
        for (int i = 0; i < 100; i++) {
            if (i % 2 != 0) {
                System.out.println(Thread.currentThread().getName()
                        + Thread.currentThread().getPriority()
                        + "：" + i);
            }
        }
    }
}
```

## 创建多线程的方式二：实现 Runnable 接口

```java
/**
 * 创建多线程的方式二： 实现 Runnable 接口中的 run 方法
 * 1.创建一个实现 Runnable 接口的实现类
 * 2.在实现类中实现 run 方法
 * 3.创建实现类的对象
 * 4.将 Runnable 接口的实现类的对象作为参数传递给 Thread 的构造器中，创建 Thread 类的对象
 * 5.使用 Thread 类对象调用 start 方法实现创建一个线程
 *
 * @author songzhengxiang
 * @create 2021-07-24 15:35
 */

// 1.创建一个实现 Runnable 接口的实现类
class MyRunnable implements Runnable {
    // 2.在实现类中实现 run 方法
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + ":" + i);
            }
        }
    }
}

public class RunnableTest {
    public static void main(String[] args) {
        // 3.创建实现类的对象
        MyRunnable myRunnable = new MyRunnable();
        // 4.将 Runnable 接口的实现类的对象作为参数传递给 Thread 的构造器中，创建 Thread 类的对象
        Thread thread = new Thread(myRunnable);
        // 5.使用 Thread 类对象调用 start 方法实现创建一个线程
        // 这里调用的是当前线程的run方法，由于我们在构造器中传递了 Runnable 接口的实现类，所以实际调用的是
        // Runnable 实现类中的 run 方法
        thread.setName("线程1");
        thread.start();

        // 创建第二个线程，不需要在 new MyRunnable，而是在 new 一个 Thread
        Thread thread1 = new Thread(myRunnable);
        thread1.setName("线程2");
        thread1.start();
    }
}
```

## 两种线程创建方式的对比

开发中，要优先选择使用实现 Runnable 的方式来创建线程

原因：实现的方式没有类的继承的局限性，实现的方式更适合处理多个线程共享数据的情况

相同点：继承 Thread 和实现 Runnable 都需要实现 run 方法，讲线程的操作逻辑写在 run 方法中

## 线程的生命周期

- 新建：当一个 Thread 类或其子类的对象被声明创建时，新生成的线程对象处于新建状态
- 就绪：处于新建状态的线程别 start 后就处于就绪状态，等待 CPU 去分配资源使其运行
- 运行：当就绪的线程被调度并获得CPU资源时就进入运行状态，run 方法定义了线程的操作和功能
- 阻塞：在某种特殊的情况下，被人为的挂起或执行输入输出操作时，让出CPU或停止自己的执行，进入阻塞状态
- 死亡：死亡是线程的最终状态，线程完成了它的全部工作或者被提前强制终止或出现异常导致线程结束。

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/javamaster/线程的生命周期.png)

## 线程安全问题

当多个线程操作共享的数据时，容易出现线程安全问题，那买票的示例来说明

```java
/**
 * 使用实现 Runnable 的方式创建三个线程来共同卖票
 * @author songzhengxiang
 * @create 2021-07-24 15:55
 */
class MyRunnable implements Runnable{
    // 此时属性不需要添加 static 修饰，因为只创建了一个对象
    private int ticket = 100;
    @Override
    public void run() {
        while (true){
            if(ticket <= 0){
                break;
            }
            // 这里增加睡眠更能体现出线程安全问题，使其更大几率出现多个窗口同时卖出同一张票的问题
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "卖出票号：" + ticket--);
        }
    }
}

public class WindowsTest1 {
    public static void main(String[] args) {
        // 创建接口实现类的对象
        MyRunnable myRunnable = new MyRunnable();
        // 创建多个线程来共同卖票
        Thread thread1 = new Thread(myRunnable);
        Thread thread2 = new Thread(myRunnable);
        Thread thread3 = new Thread(myRunnable);
        thread1.setName("窗口1");
        thread2.setName("窗口2");
        thread3.setName("窗口3");

        thread1.start();
        thread2.start();
        thread3.start();
    }
}
```

上面的代码执行后会出现下面的情况：出现了重票、错票的问题

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/javamaster/线程安全问题.png)

这是因为当一个线程进入while循环开始判断时，进入睡眠100毫秒，此时另外一个线程进来判断，这时两个线程都通过了判断，相当于两个线程都操作了同一张票，所以就产生了上面的结果

解决办法，当线程a操作数据时，其他线程不能进来，等待线程a执行完毕后，其他线程才能进来。所以我们可以使用同步代码块的方式来解决线程安全问题

## 解决安全问题的方法一：使用同步代码块解决实现Runnable的线程安全问题

同步代码的使用结构

- 同步监听器：也就是锁。可以是任何类的对象，但是所有的线程必须使用同一把锁

- 同步的代码：操作共享数据的代码就是同步代码，共享数据就是多个线程共同操作的变量。比如多个共同售卖的票，这里的票就是共享数据

```java
synchronized(同步监听器){
    需要被同步的代码
}
```

同步代码块的使用方法

```java
/**
 * 使用同步代码块解决线程安全问题
 * 1.问题：拿卖票为例，当多个窗口同时执行卖票操作时，出现了重票、错票问题
 * 2.出现的原因：当一个线程进行判断时，还没有操作票数，另外一个线程也进来判断，两个线程都是判断通过的状态，就导致
 *   两个线程回去操作相同的票，就会出现上面的问题
 * 3.解决办法：当线程a操作票时，上一把锁锁住，另外有一个线程b在线程a操作票的过程中就无法进来，等待线程a执行完毕后线程b
 *   才可以进来判断和操作，从而避免出现重票、错票的问题
 * 4.同步代码块的结构
 *      synchronized(同步监听器){
 *          // 需要被同步的代码
 *      }
 *      同步监听器：也就是 “锁”。任何一个类的对象都可以充当锁，但是所有线程都必须使用同一把锁
 *      需要被同步的代码：操作共享数据的代码就是需要被同步的代码，上面栗子中的票就是共享数据
 * 5.同步的方式解决的线程的安全问题（好处）
 *   操作同步代码时，只有一个线程参与，其他线程等待，相当于一个单线程的操作过程，效率低一些（坏处）
 *
 * @author songzhengxiang
 * @create 2021-07-26 21:55
 */

class TicketTest implements Runnable{
    private int ticketCount = 100;
    // 创建一个同步监视器
    Object obj = new Object();
    @Override
    public void run() {
        while (true){
            // 使用同步代码块将操作票的代码包括起来
            synchronized(obj){
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                if(ticketCount <= 0) break;
                System.out.println(Thread.currentThread().getName() + "卖出：" + ticketCount);
                ticketCount--;
            }
        }
    }
}

public class SynchronizedTest {
    public static void main(String[] args) {
        TicketTest t = new TicketTest();
        Thread thread1 = new Thread(t);
        Thread thread2 = new Thread(t);
        Thread thread3 = new Thread(t);

        thread1.setName("窗口1");
        thread2.setName("窗口2");
        thread3.setName("窗口3");

        thread1.start();
        thread2.start();
        thread3.start();
    }
}
```

添加了同步代码块，就不会再出现重票错票的问题

## 使用同步代码块解决继承Thread类的线程安全问题

```java
/**
 * 使用代码块解决实现 Thread 类的线程安全问题
 * @author songzhengxiang
 * @create 2021-07-27 13:12
 */
class ThreadTest1 extends Thread{
    private static int ticket = 50;
    // 声明一个静态的对象实例，保证多个对象使用同一个锁
    private static Object obj = new Object();
    @Override
    public void run() {
        while (true){
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // 使用代码块方式二
            //synchronized (ThreadTest1.class){

            // 使用代码块方式一
            synchronized (obj){
                if(ticket <= 0) break;
                System.out.println(Thread.currentThread().getName() + "卖出：" + ticket);
                ticket--;
            }
        }
    }
}

public class Synchornized3 {
    public static void main(String[] args) {
        ThreadTest1 t1 = new ThreadTest1();
        ThreadTest1 t2 = new ThreadTest1();

        t1.setName("窗口1");
        t2.setName("窗口2");

        t1.start();
        t2.start();
    }
}
```

## 使用同步监视器的注意点

- 使用同步代码块包含同步代码不能包含少了也不能包含多了
- 同步监视器除了可以使用任意类的对象，也可以考虑使用 this 和当前类本身，类也是一种对象
- 同步监视器要始终是唯一的，多个线程共用同一个

```java
/**
 * 同步监视器的多种声明方式
 * @author songzhengxiang
 * @create 2021-07-27 11:24
 */
class WindowTest implements Runnable{
    private int ticket = 100;
    @Override
    public void run() {
        while (true){
            // 只要保证同步监视器是唯一的就可以
            // 使用当前类作为同步监视器
            synchronized (WindowTest.class){
            // 使用 this 作为同步监视器
            //synchronized (this){
                if(ticket <= 0) break;
                System.out.println(Thread.currentThread().getName() + "卖出：" + ticket);
                ticket--;
            }
        }
    }
}
```

## 解决安全问题的方法二：使用同步方法解决实现Runnable线程安全问题

如果操作共享受的代码在一个独立的方法中，我们可以将这个方法设置为同步方法。设置的方式是在方法名称前面添加关键字 `synchornized`,使之成为一个同步方法

```java
/**
 * 使用同步方法解决实现 Runnable 的线程安全问题
 * 如果操作共享数据的代码刚好完整的在一个方法中，我们可以将这个方法声明成一个同步的，那么这个方法就是同步方法
 * 同步方法的声明方式，在方法前添加关键字 synchronized
 * @author songzhengxiang
 * @create 2021-07-27 13:31
 */

class TestClass1 implements Runnable{
    private int ticket = 100;
    @Override
    public void run() {
        while (true){
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if(show()) break;
        }
    }
    // 将操作共享数的代码放在一个独立的方法中,并将此方法设置为同步方法
    public synchronized boolean show(){
        if(ticket <= 0) return true;
        System.out.println(Thread.currentThread().getName() + "卖出：" + ticket);
        ticket--;
        return false;
    }
}

public class SyncMethod1 {
    public static void main(String[] args) {
        TestClass1 testClass1 = new TestClass1();
        Thread t1 = new Thread(testClass1);
        Thread t2 = new Thread(testClass1);

        t1.setName("窗口1");
        t2.setName("窗口2");

        t1.start();
        t2.start();
    }
}
```

## 使用同步方法解决继承Thread类的线程安全问题

```java
/**
 * 使用同步方法解决继承Thread类的线程安全问题
 *
 * @author songzhengxiang
 * @create 2021-07-27 14:00
 */
class TestClass2 extends Thread{
    private static int ticket = 100;
    @Override
    public void run() {
        while (true){
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if(show()) break;
        }
    }
    // 继承Thread类中的同步方法要声明成一个静态方法
    public static synchronized boolean show(){ // 同步监听器是 TestClass2.class
        if(ticket <= 0) return true;
        System.out.println(Thread.currentThread().getName() + "卖出：" + ticket);
        ticket--;
        return false;
    }
}
public class SyncMethod2 {
    public static void main(String[] args) {
        TestClass2 t1 = new TestClass2();
        TestClass2 t2 = new TestClass2();

        t1.setName("窗口1");
        t2.setName("窗口2");

        t1.start();
        t2.start();
    }
}
```

## 同步方法的总结

- 同步方法也有同步监视器，只不过不需要我们显示的声明
- 非静态的同步方法同步监视器是 this
- 静态的同步方法同步监视器是：当前类本身 Xxx.class

## 线程安全的单例模式之懒汉式

```java
/**
 * 线程安全的单例模式之懒汉式
 * @author songzhengxiang
 * @create 2021-07-27 16:03
 */
class Bank{
    // 1.私有化构造器
    private Bank(){}
    // 2.声明一个静态的类实例变量
    private static Bank instance = null;
    // 3.声明一个静态方法返回类这个类的实例
    public static Bank getInstance(){
        // 使用同步代码块将解决线程安全问题:效率稍差，多个线程都会进入同步代码块中进行判断
//        synchronized(Bank.class){
//            if(instance == null){
//                instance = new Bank();
//            }
//            return instance;
//        }

        // 效率更高：当多个线程同时过来时，先执行的线程会进入同步方法代码块中进行判断
        // 进去时候会将 instance 实例化为类的对象，这样后续进来的线程就不会进入判断
        // 也就是说不会进入到同步代码块中，从而提高了程序运行速度
        if(instance == null){
            synchronized (Bank.class){
                if(instance == null){
                    instance = new Bank();
                }
            }
        }
        return instance;
    }
}

public class BankTest {
    public static void main(String[] args) {
        Bank b1 = Bank.getInstance();
        Bank b2 = Bank.getInstance();
        System.out.println(b1 == b2);
    }
}
```

## 死锁的问题

死锁的理解：不同的线程分别占用对方需要的同步资源不放弃，都在等在对方放弃自己需要的同步资源，就形成了线程死锁。

出现死锁后，不会出现异常，不会出现提示，只是所有的线程进入阻塞状态，程序不会继续往下执行。在开发中我们要避免死锁的发生

```java
/**
 * 演示死锁的情况
 * 下面的例子中线程1等待线程2执行完放开自己所需的锁，线程2也在等待线程1执行完放开自己所需的锁
 * @author songzhengxiang
 * @create 2021-07-27 16:46
 */
public class DeadlockTest {
    public static void main(String[] args) {
        StringBuffer s1 = new StringBuffer();
        StringBuffer s2 = new StringBuffer();

        // 匿名类继承Thread类创建一个线程
        new Thread(){
            @Override
            public void run() {
                synchronized (s1){
                    s1.append("a");
                    s2.append("1");
                    // 线程1等待线程2执行完，放开s2，都在等待对方执行完，就造成了死锁的发生
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    synchronized (s2){
                        s1.append("b");
                        s2.append("2");

                        System.out.println(s1);
                        System.out.println(s2);
                    }
                }
            }
        }.start();

        // 匿名类实现 Runnable 接口的方式创建线程
        new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        synchronized (s2){
                            s1.append("c");
                            s2.append("3");
                            // 线程2等待线程1执行完，放开s1
                            try {
                                Thread.sleep(100);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            synchronized (s1){
                                s1.append("d");
                                s2.append("4");

                                System.out.println(s1);
                                System.out.println(s2);
                            }
                        }
                    }
                }
        ).start();

    }
}
```

## 解决安全问题的方法三：使用Lock锁方式解决线程安全问题

实现方式：

- 1.声明 ReentrantLock 类的实例
- 2.在需要同步的代码上用这个类实例化出的对象调用 lock() 方法
- 3.同步代码执行结束后调用 unlock() 方法解锁线程

```java
import java.util.concurrent.locks.ReentrantLock;

/**
 * 使用Lock锁方式解决线程安全问题
 * 1.声明一个 ReentrantLock 类的实例对象
 * 2.使用类对象在要实现同步的方法上调用 lock() 方法锁定线程
 * 3.同步代码执行结束后调用 unlock() 方法解锁
 *
 * @author songzhengxiang
 * @create 2021-07-27 18:22
 */
class Lock1 implements Runnable{
    private int ticket = 50;
    // 1.声明一个ReentrantLock类
    private ReentrantLock lock = new ReentrantLock();
    @Override
    public void run() {
        while (true){
            try {
                // 在try方法中手动锁定代码，此时被上锁的代码只会有一个线程执行
                lock.lock();
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                if(ticket <= 0) break;
                System.out.println(Thread.currentThread().getName() + "卖出:" + ticket);
                ticket--;
            }finally{
                // 3.代码执行完毕后手动解锁
                lock.unlock();
            }
        }
    }
}
public class LockTest {
    public static void main(String[] args) {
        Lock1 l1 = new Lock1();
        Thread t1 = new Thread(l1);
        Thread t2 = new Thread(l1);
        t1.setName("窗口1");
        t2.setName("窗口2");
        t1.start();
        t2.start();
    }
}
```

## synchronized 和 ReentrantLock 的异同

相同点：都是用来解决线程安全问题

不同点：`synchronized` 执行完响应的同步代码后会自动释放同步监听器。`ReentrantLock` 类的实例在执行同步代码前需要手动的调用 lock 方法为同步代码上锁，执行完响应的同步代码后需要手动的调用 unlock 方法来解锁

## 线程安全问题练习题

题目：设置甲乙两个账户往同一个账号中分别存入3000元，各分3次存，每次存1000，每次存完后打印当前账户的余额

```java
/**
 * 练习题：设置甲乙两个账户往同一个账号中分别存入3000元，各分3次存，每次存1000，每次存完后打印当前账户的余额
 * @author songzhengxiang
 * @create 2021-07-27 19:13
 */

import java.util.concurrent.locks.ReentrantLock;

/**
 * 账号类，账号类中存在变量余额，存钱方法
 */
class Account{
    // 设置账户余额
    public double balance = 0;
    // 声明一个线程锁
    public ReentrantLock lock = new ReentrantLock();
    // 设置存钱方法
    public void  setBalance(double balance){
        try {
            // 代码执行前给同步代码上锁
            lock.lock();
            this.balance += balance;
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + ":存钱成功，账户余额：" + this.balance);
        }finally {
            // 执行完毕后手动解锁
            lock.unlock();
        }

    }
}

/**
 * 账户类
 */
class Customer extends Thread{
    // 客户类中接收一个账户变量来作为共享数据
    private Account act = null;
    // 构造器接收账户类型的实例给变量赋值
    public Customer(Account act){
        this.act = act;
    }
    @Override
    public void run() {
        // 每个线程循环三次存入1000，共两个线程，累计往账户存入6000
        for (int i = 0; i < 3; i++) {
            act.setBalance(1000);
        }
    }
}


public class AccountTest {
    public static void main(String[] args) {
        // 声明一份共享的账号实例
        Account account = new Account();
        // 设置两个客户，共用上面的账号实例
        Customer customer1 = new Customer(account);
        Customer customer2 = new Customer(account);

        customer1.setName("甲");
        customer2.setName("乙");

        // 启动两个线程开始存钱
        customer1.start();
        customer2.start();
    }
}
```

## 线程的通信

例子：实现两个线程交替从1打印到100

要使用三个方法：

- `wait()` 执行此方法后，线程进入阻塞状态并释放同步监视器
- `notify()` 执行此方法后，就会唤醒被 `wait` 的方法，如果存在多个线程被`wait`,则优先唤醒优先级高的线程
- `notifyAll()` 执行此方法后，会唤醒所有被`wait`的线程

使用`wait(),notify(),notifyAll()`这三个方法的注意点

- 只能使用在同步代码块或者同步方法中
- 这三个方法的调用者必须是同步监视器，否则会报错 `IllegalMonitorStateException`
- 这三个方法定义在Object类中

```java
/**
 * 线程通信练习：实现两个线程交替从1打印到100
 *
 * @author songzhengxiang
 * @create 2021-07-28 14:30
 */
class Communication implements Runnable{
    private int number = 1;
    private Object obj = new Object();
    @Override
    public void run() {
        while(true){
            synchronized(obj){
                // 2.线程2进入同步代码块中后执行 notify 方法吧线程1唤醒，但是唤醒后的线程1无法进入同步代码块中
                obj.notify();
                if(number > 100) break;
                System.out.println(Thread.currentThread().getName() + ":" + number);
                number++;
                try {
                    // 1.当线程1走到wait后进入阻塞状态，并且释放同步监视器
                    obj.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
public class CommunicatuinTest {
    public static void main(String[] args) {
        Communication comm = new Communication();
        Thread t1 = new Thread(comm);
        Thread t2 = new Thread(comm);

        t1.setName("线程1");
        t2.setName("线程2");

        t1.start();
        t2.start();
    }
}
```

执行的效果如下

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/javamaster/线程通信.png)

## sleep 和 wait 的区别

相同点：

- `sleep()`和`wait()`都可以让线程进入阻塞状态

不同点

- 定义的地方不同，`sleep`定义在`Thread`类中，`wait`定义在`Object`类中
- 使用范围不同，`sleep`可以在任意地方使用，使用后可以让当前线程阻塞指定的时长，`wait`只能通过同步监视器来调用，所以只能在同步方法和同步监视器中使用
- 如果在同一个同步代码块中即使用了`sleep`也使用了`wait`，那么`sleep`执行完毕后不会释放同步监视器，`wait`执行完毕后会释放同步监视器

## 创建多线程方法三：实现Callable接口的方式创建线程

`Callable`和`Runnable`相比，`Callable`的功能更强大

- 相比 run 方法，`Callable`接口需要实现的是 `call` 方法，并且`call`方法有返回值
- `call`方法可以抛出异常
- 支持泛型返回值
- 需要借助`FutureTask`类，必须获取线程返回结果

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * jdk5.0新增的实现线程的方法一：
 * 通过实现 Callable 接口的方式创建多线程
 * @author songzhengxiang
 * @create 2021-07-29 8:16
 */

// 1.创建一个实现 Callable 接口的实现类
class MyCallable implements Callable{

    // 2.重写 Callable 接口中的 call 方法，此方法必须有返回值，不想返回值时返回一个null
    @Override
    public Object call() throws Exception {
        int num = 0;
        for (int i = 0; i < 50; i++) {
            if(i % 2 == 0){
                System.out.println(i);
                num += i;
            }
        }
        return num;
    }
}
public class CallableJava {
    public static void main(String[] args) {
        // 3.创建Callable接口实现类的对象myCallable
        MyCallable myCallable = new MyCallable();
        // 4.将myCallable作为参数放到FutureTask类的构造器中，并创建FutureTask类的对象
        FutureTask futureTask = new FutureTask(myCallable);
        // 5.创建Thread类并将FutureTask类的对象放到Thread类的构造器中并调用start方法启动线程
        new Thread(futureTask).start();

        /*
         futureTask.get() 方法为阻塞方法，会等待线程执行完毕后再获取线程的返回值
         如果线程没有执行完毕则不会执行
         因此 futureTask.get() 方法必须放在线程开始之后执行
         futureTask.get() 方法会抛出异常，需要使用 try catch 处理异常
        */
        try {
            // 6.如果想要获取线程返回值，调用 FutureTask 类对象的 get 方法来获取
            Integer count =  (Integer)futureTask.get();
            System.out.println(count);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

## 创建多线程方法四：使用线程池创建多个线程

线程池的好处：

- 提高响应速度（减少了创建新线程的时间）
- 减低资源的消耗（重复利用线程池中的线程，不需要每次都创建）
- 便于管理线程，需要使用 `ThreadPoolExecutor` 类来强转`ExecutorService`类的实例对象，然后使用`ThreadPoolExecutor`类的实例来调用下面的方法
  - `setCorePoolSize`设置线程池的数量
  - `setMaximumPoolSize` 设置最大线程数量

```java
import java.util.concurrent.*;

/**
 * 使用线程池创建多个线程
 *
 * @author songzhengxiang
 * @create 2021-07-29 15:21
 */
class RunTest implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + ":" + i);
            }
        }
    }
}

class CallTest implements Callable {
    @Override
    public Object call() throws Exception {
        Integer num = 0;
        for (int i = 0; i < 100; i++) {
            if (i % 2 != 0) {
                System.out.println(Thread.currentThread().getName() + ":" + i);
                num += i;
            }
        }
        return num;
    }
}

public class PoolJava {
    public static void main(String[] args) {
        // 1.创建指定线程数量的线程池
        ExecutorService service = Executors.newFixedThreadPool(5);

        // 线程池设置,Executors 返回的实例是由 ThreadPoolExecutor 类创建的
        System.out.println(service.getClass());
        // 将 service1 强转成 ThreadPoolExecutor
        ThreadPoolExecutor service1 = (ThreadPoolExecutor)service;
        // 设置线程池的数量
        service1.setCorePoolSize(10);
        // 获取当前线程池的线程数量
        System.out.println(service1.getCorePoolSize()); //=> 10


        // 2.执行指定线程操作，需要提供Runnable接口或者Callable接口的实现类对象
        service.execute(new RunTest()); // 适用于 Runnable 接口实现类的对象

        // submit 方法会返回一个 Future，可以用来获取线程返回值
        Future future = service.submit(new CallTest());// 适用于 Callable 接口实现类的对象
        try {
            // 获取线程的返回值
            Integer obj =  (Integer)future.get();
            // 打印线程返回值
            System.out.println(obj);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        // 3.关闭线程池
        service.shutdown();

    }
}
```

