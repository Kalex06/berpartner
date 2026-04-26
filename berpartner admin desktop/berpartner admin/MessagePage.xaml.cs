using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
using System.Text.Json.Serialization;

namespace berpartner_admin
{
    /// <summary>
    /// Interaction logic for MessagePage.xaml
    /// </summary>
    public partial class MessagePage : Page
    {
        public MessagePage()
        {
            InitializeComponent();
        }

        List<User> users { get; set; } = new List<User>();
        public class User
        {

            public int id { get; set; }
            public string nev { get; set; }
            public string telefonszam { get; set; }
            public string email { get; set; }
            public int berelt_eszkozok_szama { get; set; }
            public string jogosultsag { get; set; }
            public string iranyitoszam { get; set; }
            public string varos { get; set; }
            public string utca { get; set; }
            public string haz_szam { get; set; }



        }

        private static readonly HttpClient client = new HttpClient();

        private async void Page_Loaded(object sender, RoutedEventArgs e)
        {


            try
            {

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                HttpResponseMessage respons = await client.GetAsync("http://localhost:3000/user/getAll");

                if (respons.IsSuccessStatusCode)
                {

                    users = await respons.Content.ReadFromJsonAsync<List<User>>();
                    
                    
                   ComboBox1.ItemsSource = users;
                    
                }
                else
                {

                    if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {

                        MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                        MainWindow main = new MainWindow();
                        main.Show();
                        HomeWindow home = new HomeWindow();
                        home.Close();



                    }
                    else
                    {

                        MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

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

        private async void send_Click(object sender, RoutedEventArgs e)
        {
            try
            {

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);
                HttpResponseMessage respons = null;

                if (targyTextBox.Text != "" || uzenetTextBox.Text != "")
                {
                    

                        if (valakinekRadio.IsChecked == true)
                        {
                        if (ComboBox1.SelectedIndex != -1)
                        {
                            var message = new
                            {
                                felado_id = (string)null,
                                cimzett_id = ComboBox1.SelectedValue,
                                berles_id = (string)null,
                                cim = targyTextBox.Text,
                                tartalom = uzenetTextBox.Text,
                                tipus = "message",
                            };


                            respons = await client.PostAsJsonAsync("http://localhost:3000/message/send", message);
                        }
                        else {
                        MessageBox.Show("Nincs Címzett kiválasztva", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                            return;

                        }


                        }
                        else
                        {

                            var message = new
                            {
                                felado_id = (string)null,
                                cim = targyTextBox.Text,
                                tartalom = uzenetTextBox.Text,
                            };
                            respons = await client.PostAsJsonAsync("http://localhost:3000/message/send/everyone", message);

                        }



                        if (respons.IsSuccessStatusCode)
                        {

                            MessageBox.Show("Üzenet(ek) elküldve!", "Sikeres küldés", MessageBoxButton.OK, MessageBoxImage.Information);
                        }
                        else
                        {

                            if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                            {

                                MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                                MainWindow main = new MainWindow();
                                main.Show();
                                HomeWindow home = new HomeWindow();
                                home.Close();



                            }
                            else
                            {

                                MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                            }



                        }

                }
                else {

                    MessageBox.Show("Az üzenetnek kötelező tárgyat és tartalmat adni.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error); 
                
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
