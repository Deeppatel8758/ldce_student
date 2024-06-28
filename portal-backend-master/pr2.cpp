#include<iostream>
#include<string>

using namespace std;

int main(){
    string pt;
    cin>>pt;
    string key;
    cin>>key;
    
int i,j;
    int pt_len = pt.length();
    string newkey;


    int key_len= key.length();
    for(i = 0, j = 0; i <pt_len;i++, j++)
                {
            if(j ==key_len){
                       j =0;
            }
         
             newkey[i]=key[j];

                }
cout<<pt_len;

   
             
    string emsg;

   for(i =0;i <pt_len;i++)
   {

 emsg[i] = ((pt[i] + newkey[i]) % 26 )+ 'A';
 cout<<emsg[i];

   }
// cout<<emsg.size();

for(i=0;i<emsg.length();i++){
cout<<emsg[i];
}
   

    


    
}


