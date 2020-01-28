% x_for_y/3.

price(classic, 269.99).
price(premium, 394.99).
price(stand_out, 322.99).

x_for_y(classic, 3, 2).

negotiated_price(premium, 389.99).

negotiated_price(_, _, [], []). 
negotiated_price(Type,Price, [price(Type,_) | T], [price(Type, Price) | T2]) :-
	negotiated_price(Type, Price, T, T2).

negotiated_price(Type, Price, [X | T], [X | T2]) :-
	negotiated_price(Type, Price, T, T2).



count([], _E, 0).
count([price(Type, _) | Tail], Type, Count) :-
    count(Tail, Type, New_Count),
    Count is New_Count + 1.

count([price(_, _) | Tail], Type, Count) :-
    count(Tail, Type, Count).

fire(Type, X, Y, [price(Type, Price) | T] , A) :-
    (  (count([price(Type, Price) | T], Type, Num_Occurances), !, 0 =:= Num_Occurances mod Y)
    -> A = X
    ;  A = Y  
     ).
    
x_for_y(Type, X, Y, Cart, New_Cart) :-
	x_for_y(Type, X, Y, Cart, New_Cart, 0).

x_for_y(_, _, _, [], [], _).

x_for_y(Type, X, Y, [price(Type, Price) | T], [H | Rest], 0) :-
	
    (
    	(count([price(Type, Price) | T], Type, Num_Occurances), !, 0 =:= Num_Occurances mod Y) -> 
    		(   H = price(Type, 0), F is Y - X - 1, (x_for_y(Type, X, Y, T, Rest, F)))
    	;
    		(   H = price(Type, Price), (x_for_y(Type, X, Y, T, Rest, 0)))
    ).


x_for_y(Type, X, Y, [price(Type, _Price) | T], [price(Type, 0) | Rest], Num_Free) :-
    x_for_y(Type, X, Y, T, Rest, New_Num_Free),
    Num_Free is New_Num_Free + 1.
    
x_for_y(Type, X, Y, [price(T2, Price) | T], [price(T2, Price) | Rest], Num_Free) :-
	x_for_y(Type, X, Y, T, Rest, Num_Free).

    :-use_module(library(lists)).
% x_for_y/3.

price(classic, 269.99).
price(premium, 394.99).
price(stand_out, 322.99).

x_for_y(classic, 3, 2).

negotiated_price(premium, 389.99).

negotiated_price(_, _, [], []). 
negotiated_price(Type,Price, [price(Type,_) | T], [price(Type, Price) | T2]) :-
	negotiated_price(Type, Price, T, T2).

negotiated_price(Type, Price, [X | T], [X | T2]) :-
	negotiated_price(Type, Price, T, T2).



count([], _E, 0).
count([price(Type, _) | Tail], Type, Count) :-
    count(Tail, Type, New_Count),
    Count is New_Count + 1.

count([price(_, _) | Tail], Type, Count) :-
    count(Tail, Type, Count).

fire(Type, X, Y, [price(Type, Price) | T] , A) :-
    (  (count([price(Type, Price) | T], Type, Num_Occurances), 0 =:= Num_Occurances mod Y)
    -> A = X
    ;  A = Y  
     ).

x_for_y(Type, X, Y, Cart, New_Cart) :-
	count(Cart, Type, Num_Of_Type),
    Num_Free is ((Num_Of_Type // Y) * (Y - X)),
	make_free(Type, Cart, New_Cart, Num_Free).
    
make_free(_Type, [], [], _Num_Free).
make_free(Type, [H | T], [H | Rest], 0) :-
	make_free(Type, T, Rest, 0).

make_free(Type, [price(Type, _Price) | T], [price(Type, 0) | Rest], Num_Free) :-
    New_Num_Free is Num_Free - 1,
    make_free(Type, T, Rest, New_Num_Free).
    
make_free(Type, [price(T2, Price) | T], [price(T2, Price) | Rest], Num_Free) :-
	make_free(Type, T, Rest, Num_Free).
    
x_for_y(_, _, _, [], [], _).

x_for_y(Type, X, Y, [price(Type, Price) | T], [H | Rest], 0) :-
	
    (
    	(count([price(Type, Price) | T], Type, Num_Occurances), !, 0 =:= Num_Occurances mod Y) -> 
    		(   H = price(Type, 0), F is Y - X - 1, (x_for_y(Type, X, Y, T, Rest, F)))
    	;
    		(   H = price(Type, Price), (x_for_y(Type, X, Y, T, Rest, 0)))
    ).


x_for_y(Type, X, Y, [price(Type, _Price) | T], [price(Type, 0) | Rest], Num_Free) :-
    x_for_y(Type, X, Y, T, Rest, New_Num_Free),
    Num_Free is New_Num_Free + 1.
    
x_for_y(Type, X, Y, [price(T2, Price) | T], [price(T2, Price) | Rest], Num_Free) :-
	x_for_y(Type, X, Y, T, Rest, Num_Free).