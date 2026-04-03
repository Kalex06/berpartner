using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Net.Http;
using System.Net.Http.Json; 
using System.Threading.Tasks; 

namespace berpartner_admin
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public class Login {
        
            public string email { get; set; }
            public string jelszo { get; set; }
        
        }

        public class LoginResponse
        {
            public string token { get; set; }
        }

        private static readonly HttpClient client = new HttpClient();

        private async void Button_Click(object sender, RoutedEventArgs e)
        {

            Login loginData = new Login();
            loginData.email = emailInput.Text;
            loginData.jelszo = passwordInput.Password;




            try
            {


                HttpResponseMessage respons = await client.PostAsJsonAsync("http://localhost:3000/auth/login", loginData);

                if (respons.IsSuccessStatusCode)
                {

                    var result = await respons.Content.ReadFromJsonAsync<LoginResponse>();






                    App.Token = result.token;





                    HomeWindow home = new HomeWindow();
                    home.Show();
                    this.Close();

                }
                else
                {

                    if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {

                        MessageBox.Show("Nincs jogosultságod a belépéshez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);

                    }
                    else {
                    
                    MessageBox.Show("Hibás felhasználónév vagy jeszó!", "Hibás Adatok", MessageBoxButton.OK, MessageBoxImage.Error);
                    
                    }

                    

                }

            }
            catch (HttpRequestException)
            {
                MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            
        }
    }
}