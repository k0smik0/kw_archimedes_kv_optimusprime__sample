/*******************************************************************************
 * Copyleft 2013 Massimiliano Leone - maximilianus@gmail.com .
 * 
 * Prova.java is part of 'festival_sample'.
 * 
 * 'festival_sample' is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * 
 * 'festival_sample' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with 'festival_sample'; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
 ******************************************************************************/
package prova;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.iubris.kw.utils.Accessor;

public class Prova {

	private int intero;
	
	private Date data;

	public int getIntero() {
		return intero;
	}

	public void setIntero(int intero) {
		this.intero = intero;
	}

	public Date getData() {
		return data;
	}
	
	public void setIntero(String s) {
		this.intero = Integer.parseInt(s);
	}

	public void setData(Date data) {
		this.data = data;
	}
	public void setData(String s) {
		DateFormat df = new SimpleDateFormat(); 
		try {
			this.data = df.parse(s);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
	
	static public void main(String[] args) {
		Prova p = new Prova();
		
		for (Method m: p.getClass().getDeclaredMethods()) {
			System.out.println(m);
			Class[] cs = m.getParameterTypes();
			for (Class c: cs) {
				System.out.println(c);
			}
			System.out.println("\n\n");
		}
		
		Field f = null;
		try {
			f = p.getClass().getDeclaredField("data");
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			e.printStackTrace();
		}
		
		Method m = Accessor.INSTANCE.getSetterAccessorForField("setData",f,p);
		
		
		try {
			m.invoke(p, 10);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		
		/*
		try {
			System.out.println(p.getClass().getMethod("setData",new Class[]));
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		*/
		
	}
	
}
