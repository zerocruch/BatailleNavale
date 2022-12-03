import java.util.Random;
import java.util.Scanner;
public class BatailleNavale {
	final static int Map_Size = 10;
	final static int NumberOfPlayers = 5;
	final static String XValues = "ABCDEFGHIJ";
	final static String YValues = "0123456789";
	public static int[][] Map = new int[10][10]; 
	public static int[][] AttackedMap = new int[10][10]; 

	final static int PortAvion = 1;
	final static int PortAvionSize = 5;

	final static int Croiseur = 2;
	final static int CroiseurSize = 4;

	final static int ContreTorpilleur = 3;
	final static int ContreTorpilleurSize = 3;

	final static int SousMarin = 4;
	final static int SousMarinSize = 3;

	final static int Torpilleur = 5;
	final static int TorpilleurSize = 2;


	public static int[][] Players = { {PortAvion, PortAvionSize}, {Croiseur, CroiseurSize}, {ContreTorpilleur, ContreTorpilleurSize}, {SousMarin, SousMarinSize}, {Torpilleur, TorpilleurSize}};

	public static int ShipsSizeToKill = PortAvionSize+CroiseurSize+ContreTorpilleurSize+SousMarinSize+TorpilleurSize;

	public static void main(String[] args) {
		//Initiate Input
		Scanner Input = new Scanner(System.in);

		//Initiate Map And Ships Positions
		InitiateMap();

		//Show Map With Ships Positions
		//ShowMap();
		//System.out.println("");
		

		System.out.println("Chose A Position To Drop Missle (Example A0)");
		while (true){
			//Attacker Map
			ShowAttackedMap();
			try{
				String Position = Input.nextLine();
				char X = Position.charAt(0);
				char Y = Position.charAt(1);
				String result = Kill(X, Y);
				if(result.equals("You Won!!")){
					System.out.println(result);
					break;
				}else if(!result.equals("")){
					System.out.println(result);
				}
			}catch(Exception e){
				System.out.println("Please Enter A Valid Postion (Example A0)");
			}
		}
	}

	public static void InitiateMap(){
		for (int i=0;i<NumberOfPlayers;i++){
			boolean Done = false;
			int CurrentPlayer = Players[i][0];
			int CurrentPlayerSize = Players[i][1];
			while (!Done){
				Random ran = new Random();
				int RandomX = ran.nextInt(Map_Size);
				int RandomY = ran.nextInt(Map_Size);
				//System.out.println(RandomX+" | "+RandomY+" -> "+CurrentPlayer);
				if(Map[RandomX][RandomY] == 0){
					boolean valid = true;
					try{
						for (int j=1;j<=CurrentPlayerSize;j++){
							//Direction "LEFT" 
							if (Map[RandomX][RandomY-j] != 0) {
								valid = false;
								break;
							}
						}
						if (valid) {
							for (int j=0;j<CurrentPlayerSize;j++){
								//Direction "LEFT" 
								Map[RandomX][RandomY-j] = CurrentPlayer;
							}
						}
						
						Done = true;
					}catch(Exception e){
						;
					}

					if (!valid) {
						try{
							valid = true;
							for (int j=1;j<=CurrentPlayerSize;j++){
								//Direction "RIGHT" 
								if (Map[RandomX][RandomY+j] != 0) {
									valid = false;
									break;
								}
							}
							if (valid) {
								for (int j=0;j<CurrentPlayerSize;j++){
									//Direction "RIGHT" 
									Map[RandomX][RandomY+j] = CurrentPlayer;
								}
							}
							Done = true;
						}catch(Exception e){
							;
						}

					}

					if (!valid) {
						try{
							valid = true;
							for (int j=1;j<=CurrentPlayerSize;j++){
								//Direction "UP" 
								if (Map[RandomX+j][RandomY] != 0) {
									valid = false;
									break;
								}
							}
							if (valid) {
								for (int j=0;j<CurrentPlayerSize;j++){
									//Direction "UP" 
									Map[RandomX+j][RandomY] = CurrentPlayer;
								}
							}
							Done = true;
						}catch(Exception e){
							;
						}

					}

					if (!valid) {
						try{
							valid = true;
							for (int j=0;j<=CurrentPlayerSize;j++){
								//Direction "DOWN" 
								if (Map[RandomX-j][RandomY] != 0) {
									valid = false;
									break;
								}
							}
							if (valid) {
								for (int j=1;j<CurrentPlayerSize;j++){
									//Direction "UP" 
									Map[RandomX-j][RandomY] = CurrentPlayer;
								}
							}
							Done = true;
						}catch(Exception e){
							;
						}
					}
				}
			}
		}
	}

	public static void ShowMap(){
		//Create Header
		System.out.print("  | ");
		for(int i=0;i<Map_Size;i++){
			System.out.print(XValues.charAt(i)+" | ");
		}
		System.out.println();
		//Create Body
		for(int i=0;i<Map_Size;i++){
			System.out.print(YValues.charAt(i)+" | ");
			for(int j=0;j<Map_Size;j++){
				System.out.print(Map[i][j]+" | ");
			}
			System.out.println();
		}
	}

	public static void ShowAttackedMap(){
		//Create Header
		System.out.print("  | ");
		for(int i=0;i<Map_Size;i++){
			System.out.print(XValues.charAt(i)+" | ");
		}
		System.out.println();
		//Create Body
		for(int i=0;i<Map_Size;i++){
			System.out.print(YValues.charAt(i)+" | ");
			for(int j=0;j<Map_Size;j++){
				if (AttackedMap[i][j] == -1) {
					System.out.print("X | ");
				}else{
					System.out.print(AttackedMap[i][j]+" | ");
				}
				
			}
			System.out.println();
		}
	}

	public static String Kill(char x, char y){
		int XIndex = XValues.indexOf(String.valueOf(x));
		int YIndex = YValues.indexOf(String.valueOf(y));
		if ((XIndex == -1) || (YIndex == -1)) {
			System.out.println("Please Enter A Valid Postion (Example A0)");
		}else{
			//System.out.println(XIndex+"  |  "+YIndex);
			if (Map[YIndex][XIndex] == -1) {
				System.out.println("Position Already Attacked");
			}else if (Map[YIndex][XIndex] == 0) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				return "You Hited Nothing";
			}else if (Map[YIndex][XIndex] == 1) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					return "You Won!!";
				}
				return "You Hited Porte-Avion";
			}else if (Map[YIndex][XIndex] == 2) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					return "You Won!!";
				}
				return "You Hited Croiseur";
			}else if (Map[YIndex][XIndex] == 3) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					return "You Won!!";
				}
				return "You Hited Contre-Torpilleur";
			}else if (Map[YIndex][XIndex] == 4) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					return "You Won!!";
				}
				return "You Hited Sous-Marin";
			}else if (Map[YIndex][XIndex] == 5) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					return "You Won!!";
				}
				return "You Hited Torpilleur";
			}
		}
		return "";
	}	
}