import pl from 'tau-prolog/modules/js';
import loader from 'tau-prolog/modules/lists';

loader(pl);

const session = pl.create(1000);

const program = `
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
`;

session.consult(program);
